import {readLines} from '../utils';

export const Day06 = {
  async Part1Answer(filename: string) {
    const map = await readLines(filename);
    const path = getPatrolPath(map);
    return countPath(path);
  },
  async Part2Answer(filename: string) {
    const map = await readLines(filename);
    const path = getPatrolPath(map);
    return countCycleOpportunities(map, path);
  },
};

enum Direction {
  Up,
  Right,
  Down,
  Left,
}

type PatrollingGuardState = {
  status: 'patrol';
  row: number;
  col: number;
  direction: Direction;
};

type GuardState = PatrollingGuardState | {status: 'gone'};

function getInitialState(map: string[]): GuardState {
  for (let i = 0; i < map.length; i++) {
    const line = map[i];
    const index = line.indexOf('^');
    if (index !== -1) {
      return {status: 'patrol', row: i, col: index, direction: Direction.Up};
    }
  }
  return {status: 'gone'};
}

/**
 * This is the main movement logic. Return the next state based on the previous state and the map
 */
function getNextState(prevState: GuardState, map: string[]): GuardState {
  if (prevState.status !== 'patrol') return prevState;

  // The next spot if the guard just goes straight forward
  const nextSpot = (() => {
    switch (prevState.direction) {
      case Direction.Up:
        return {row: prevState.row - 1, col: prevState.col};
      case Direction.Right:
        return {row: prevState.row, col: prevState.col + 1};
      case Direction.Down:
        return {row: prevState.row + 1, col: prevState.col};
      case Direction.Left:
        return {row: prevState.row, col: prevState.col - 1};
    }
  })();

  // Check if the guard is going out of bounds
  if (
    nextSpot.row < 0 ||
    nextSpot.row >= map.length ||
    nextSpot.col < 0 ||
    nextSpot.col >= map[0].length
  ) {
    return {status: 'gone'};
  }

  const nextSpotContents = map[nextSpot.row][nextSpot.col];
  if (nextSpotContents === '#') {
    // Hit an obstacle. Rotate
    return {...prevState, direction: (prevState.direction + 1) % 4};
  }
  // No obstacle, just advance
  return {...prevState, ...nextSpot};
}

// Part 1 ======================================================================

function getPatrolPath(map: string[]): boolean[][] {
  let path: boolean[][] = Array.from({length: map.length}, () => []);
  let guardState = getInitialState(map);

  while (guardState.status === 'patrol') {
    path[guardState.row][guardState.col] = true;
    guardState = getNextState(guardState, map);
  }

  return path;
}

function countPath(path: boolean[][]): number {
  let count = 0;

  path.forEach((row) => {
    row.forEach((spotVisited) => {
      if (spotVisited) {
        count++;
      }
    });
  });

  return count;
}

// Part 2 ======================================================================

function checkCycle(map: string[]): boolean {
  let prevLocations: Record<number, Record<number, Direction[]>> = {};
  let guardState = getInitialState(map);

  while (guardState.status === 'patrol') {
    const prevDirections = prevLocations[guardState.row]?.[guardState.col] ?? [];
    // If the guard has been in the same spot and the same direction before, we're in a cycle
    if (prevDirections.includes(guardState.direction)) return true;

    // Not looping yet, save off current state and get the next one
    if (!prevLocations[guardState.row]) {
      prevLocations[guardState.row] = {};
    }
    prevLocations[guardState.row][guardState.col] = [...prevDirections, guardState.direction];

    guardState = getNextState(guardState, map);
  }

  // Finished without hitting loop
  return false;
}

function countCycleOpportunities(map: string[], path: boolean[][]): number {
  let cycles = 0;
  const startingSpot = getInitialState(map) as PatrollingGuardState;

  map.forEach((row, i) => {
    row.split('').forEach((spot, j) => {
      if (!path[i][j]) return; // not on the path
      if (startingSpot.row === i && startingSpot.col === j) return; // Can't use starting spot

      let modifiedMap = addObstacle(map, i, j);
      if (checkCycle(modifiedMap)) {
        cycles++;
      }
    });
  });
  return cycles;
}

function addObstacle(map: string[], row: number, col: number): string[] {
  let modifiedMap = map.map((l) => l.split(''));
  modifiedMap[row][col] = '#';
  return modifiedMap.map((l) => l.join(''));
}

// console.log(await Day06.Part2Answer('input.txt'));
