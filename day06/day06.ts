import {readLines} from '../utils';

export const Day06 = {
  async Part1Answer(filename: string) {
    const map = await readLines(filename);
    const path = getPatrolPath(map);
    return countPath(path);
  },
  async Part2Answer(filename: string) {
    return 0;
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

function getPatrolPath(puzzle: string[]): boolean[][] {
  let path: boolean[][] = Array.from({length: puzzle.length}, () =>
    Array.from({length: puzzle[0].length}, () => false),
  );
  let guardState = getInitialState(puzzle);

  while (guardState.status === 'patrol') {
    path[guardState.row][guardState.col] = true;
    guardState = getNextState(guardState, puzzle);
  }

  return path;
}

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

function getNextState(prevState: GuardState, puzzle: string[]): GuardState {
  if (prevState.status === 'gone') return prevState;

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
    nextSpot.row >= puzzle.length ||
    nextSpot.col < 0 ||
    nextSpot.col >= puzzle[0].length
  ) {
    return {status: 'gone'};
  }

  const nextSpotContents = puzzle[nextSpot.row][nextSpot.col];
  if (nextSpotContents === '#') {
    // Hit an obstacle. Rotate
    return {...prevState, direction: (prevState.direction + 1) % 4};
  }
  // No obstacle, just advance
  return {...prevState, ...nextSpot};
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

console.log(await Day06.Part1Answer('input.txt'));
