import {readLines} from '../utils';

export const Day20 = {
  async Part1Answer(filename: string) {
    const maze = await readLines(filename);
    const steps = getSteps(maze);
    const cheats = findCheats(steps);
    return Object.entries(cheats).reduce((total, [saved, cheats]) => {
      if (Number.parseInt(saved) >= 100) {
        return total + cheats;
      }
      return total;
    }, 0);
  },
  async Part2Answer(filename: string) {
    const maze = await readLines(filename);
    return 0;
  },
};

type PathValue = 'S' | '.' | 'E';

type Step = {
  id: number;
  value: PathValue;
  row: number;
  col: number;
  direction?: Direction;
};

enum Direction {
  Up,
  Right,
  Down,
  Left,
}

export function getSteps(maze: string[]): Step[] {
  const firstStep: Step = (() => {
    for (let i = 0; i < maze.length; i++) {
      for (let j = 0; j < maze[0].length; j++) {
        if (maze[i][j] === 'S') {
          return {id: 0, value: 'S', row: i, col: j};
        }
      }
    }
    throw new Error("can't find start");
  })();

  let steps: Step[] = [];

  function getNextStep(prevStep: Step): Step | null {
    if (prevStep.value === 'E') return null;

    // Check up
    if (prevStep.direction !== Direction.Down && maze[prevStep.row - 1]?.[prevStep.col] !== '#') {
      const row = prevStep.row - 1;
      const col = prevStep.col;
      return {
        id: steps.length,
        value: maze[row][col] as PathValue,
        row,
        col,
        direction: Direction.Up,
      };
    }
    // Check right
    if (prevStep.direction !== Direction.Left && maze[prevStep.row][prevStep.col + 1] !== '#') {
      const row = prevStep.row;
      const col = prevStep.col + 1;
      return {
        id: steps.length,
        value: maze[row][col] as PathValue,
        row,
        col,
        direction: Direction.Right,
      };
    }
    // Check down
    if (prevStep.direction !== Direction.Up && maze[prevStep.row + 1]?.[prevStep.col] !== '#') {
      const row = prevStep.row + 1;
      const col = prevStep.col;
      return {
        id: steps.length,
        value: maze[row][col] as PathValue,
        row,
        col,
        direction: Direction.Down,
      };
    }
    // Check left
    if (prevStep.direction !== Direction.Right && maze[prevStep.row][prevStep.col - 1] !== '#') {
      const row = prevStep.row;
      const col = prevStep.col - 1;
      return {
        id: steps.length,
        value: maze[row][col] as PathValue,
        row,
        col,
        direction: Direction.Left,
      };
    }
    return null;
  }

  let currentStep: Step | null = firstStep;
  while (currentStep) {
    steps.push(currentStep);
    currentStep = getNextStep(currentStep);
  }

  return steps;
}

export function findCheats(steps: Step[]): Record<number, number> {
  let cheats: Record<number, number> = {};

  steps.forEach((step) => {
    cheatOffsets.forEach((diff) => {
      const nextStep = steps.find(
        (s) => s.row === step.row + diff[0] && s.col === step.col + diff[1],
      );
      if (!nextStep) return;
      const savedTime = nextStep.id - step.id - 2;
      if (savedTime > 0) {
        cheats[savedTime] = cheats[savedTime] ? cheats[savedTime] + 1 : 1;
      }
    });
  });

  return cheats;
}

const cheatOffsets = [
  [-2, 0],
  [-1, 1],
  [0, 2],
  [1, 1],
  [2, 0],
  [1, -1],
  [0, -2],
  [-1, -1],
];

console.log(await Day20.Part1Answer('input.txt'));
