// js-v8/battle/movement.js
// 한국사 영웅전 v8 · 이동 범위 계산 + 경로 탐색
// 02_BATTLE_SYSTEM §8 BFS + 지형 비용.
//
// TILE 값 (maps.json tileLegend 기반):
//   0 plain · 1 grass · 2 forest · 3 mountain · 4 water · 5 road/path · 6 sindansu/village
//
// 기마(unitType='기마병')는 road 비용 0.5.

// 지형 이동 비용 (값: 코스트, Infinity = 통과 불가)
const TERRAIN_COST = {
  0: 1,    // 평지
  1: 1,    // 풀
  2: 2,    // 숲
  3: Infinity, // 산
  4: Infinity, // 물
  5: 1,    // 길
  6: 1,    // 신단수/마을 타일
};

function tileCost(tile, unit) {
  if (tile === undefined) return Infinity;
  let c = TERRAIN_COST[tile];
  if (c === undefined) c = 1;
  if (unit?.unitType === '기마병' && tile === 5) c = 0.5;
  return c;
}

// 기동력 보너스 (버프)
function effectiveMov(unit) {
  let m = unit.mov || 0;
  if (unit.buffs) for (const b of unit.buffs) if (b.type === 'buff_mov') m += (b.mod || 0);
  return Math.max(0, m);
}

function keyOf(x, y) { return `${x},${y}`; }

// 타일 통과 가능 여부: 적 유닛이 차지한 칸 통과 불가 (아군은 통과 가능)
function occupiedBy(x, y, unit, allUnits) {
  for (const u of allUnits) {
    if (u === unit) continue;
    if (u.hp <= 0) continue;
    if (u.x === x && u.y === y) return u;
  }
  return null;
}

function canStandOn(x, y, map, unit, allUnits) {
  const tile = map?.terrain?.[y]?.[x];
  if (tileCost(tile, unit) === Infinity) return false;
  const occ = occupiedBy(x, y, unit, allUnits);
  if (occ) return false;  // 최종 정지지점엔 다른 유닛 X
  return true;
}

function canEnter(x, y, map, unit, allUnits) {
  const tile = map?.terrain?.[y]?.[x];
  if (tileCost(tile, unit) === Infinity) return false;
  const occ = occupiedBy(x, y, unit, allUnits);
  if (occ && occ.team !== unit.team) return false;  // 적 유닛은 통과 불가
  return true;
}

// ─────────────────────────────────────────────
// calcMoveRange(unit, map, allUnits) → [{x,y,cost}]
// BFS Dijkstra-style (float 코스트 대응)
// ─────────────────────────────────────────────
export function calcMoveRange(unit, map, allUnits = []) {
  const mov = effectiveMov(unit);
  const best = new Map();         // key → minCost
  best.set(keyOf(unit.x, unit.y), 0);

  const queue = [{ x: unit.x, y: unit.y, cost: 0 }];
  const result = [];
  const DIRS = [[1,0],[-1,0],[0,1],[0,-1]];

  while (queue.length) {
    queue.sort((a, b) => a.cost - b.cost);
    const cur = queue.shift();
    const ck = keyOf(cur.x, cur.y);
    if (cur.cost > (best.get(ck) ?? Infinity)) continue;

    if (canStandOn(cur.x, cur.y, map, unit, allUnits)) {
      result.push({ x: cur.x, y: cur.y, cost: cur.cost });
    } else if (cur.x === unit.x && cur.y === unit.y) {
      // 출발점은 결과에 포함 (본인 위치)
      result.push({ x: cur.x, y: cur.y, cost: 0 });
    }

    for (const [dx, dy] of DIRS) {
      const nx = cur.x + dx, ny = cur.y + dy;
      const tile = map?.terrain?.[ny]?.[nx];
      const step = tileCost(tile, unit);
      if (!isFinite(step)) continue;
      if (!canEnter(nx, ny, map, unit, allUnits)) continue;
      const nc = cur.cost + step;
      if (nc > mov) continue;
      const nk = keyOf(nx, ny);
      if (nc < (best.get(nk) ?? Infinity)) {
        best.set(nk, nc);
        queue.push({ x: nx, y: ny, cost: nc });
      }
    }
  }

  // 중복 제거 (최소 코스트만)
  const map2 = new Map();
  for (const r of result) {
    const k = keyOf(r.x, r.y);
    if (!map2.has(k) || map2.get(k).cost > r.cost) map2.set(k, r);
  }
  return [...map2.values()];
}

// ─────────────────────────────────────────────
// findPath(unit, target, map, allUnits) → [{x,y}] or null
// A* (휴리스틱: 맨해튼 거리)
// ─────────────────────────────────────────────
export function findPath(unit, target, map, allUnits = []) {
  const startK = keyOf(unit.x, unit.y);
  const goalK  = keyOf(target.x, target.y);
  if (startK === goalK) return [{ x: unit.x, y: unit.y }];

  const open = new Map();  // key → node
  const closed = new Set();
  const startNode = { x: unit.x, y: unit.y, g: 0, f: 0, parent: null };
  open.set(startK, startNode);

  const DIRS = [[1,0],[-1,0],[0,1],[0,-1]];

  while (open.size) {
    // f가 최소인 노드
    let cur = null, curK = null;
    for (const [k, n] of open) {
      if (!cur || n.f < cur.f) { cur = n; curK = k; }
    }
    if (curK === goalK) {
      // 경로 재구성
      const path = [];
      let p = cur;
      while (p) { path.unshift({ x: p.x, y: p.y }); p = p.parent; }
      return path;
    }
    open.delete(curK);
    closed.add(curK);

    for (const [dx, dy] of DIRS) {
      const nx = cur.x + dx, ny = cur.y + dy;
      const nk = keyOf(nx, ny);
      if (closed.has(nk)) continue;
      const tile = map?.terrain?.[ny]?.[nx];
      const step = tileCost(tile, unit);
      if (!isFinite(step)) continue;
      // 목표 타일은 점유돼도 OK (공격 대상)
      const isGoal = (nx === target.x && ny === target.y);
      if (!isGoal && !canEnter(nx, ny, map, unit, allUnits)) continue;

      const g = cur.g + step;
      const h = Math.abs(nx - target.x) + Math.abs(ny - target.y);
      const f = g + h;
      const existing = open.get(nk);
      if (!existing || g < existing.g) {
        open.set(nk, { x: nx, y: ny, g, f, parent: cur });
      }
    }
  }
  return null;
}

// ─────────────────────────────────────────────
// 공격 사거리 타일 (현재 위치 기준)
// ─────────────────────────────────────────────
export function calcAttackRange(unit, map) {
  const tiles = [];
  const rng = unit.rng || 1;
  for (let dy = -rng; dy <= rng; dy++) {
    for (let dx = -rng; dx <= rng; dx++) {
      const d = Math.abs(dx) + Math.abs(dy);
      if (d === 0 || d > rng) continue;
      const x = unit.x + dx, y = unit.y + dy;
      if (y < 0 || y >= (map?.terrain?.length || 0)) continue;
      if (x < 0 || x >= (map?.terrain?.[0]?.length || 0)) continue;
      tiles.push({ x, y });
    }
  }
  return tiles;
}

// 맨해튼 거리
export function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// 지형 방어 보너스
export function terrainDefBonus(tile) {
  if (tile === 2) return 2;  // 숲 +2
  if (tile === 6) return 1;  // 마을/신단수 +1
  return 0;
}
