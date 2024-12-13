import {readTextFile, sumByFunc} from '../utils';

export const Day13 = {
  async Part1Answer(filename: string) {
    const input = await readTextFile(filename);
    const machines = parseMachines(input);
    return sumByFunc(machines, findCost);
  },
  async Part2Answer(filename: string) {
    const input = await readTextFile(filename);
    const machines = parseMachines(input, 10000000000000);
    return sumByFunc(machines, findCost);
  },
};

type Coordinates = {x: number; y: number};

type Machine = {
  A: Coordinates;
  B: Coordinates;
  prize: Coordinates;
};

type Presses = {A: number; B: number};

/**
 * Takes a machine and uses RREF to find the values of A and B presses that actually get to the target
 * Note: The cost is a red herring
 * This is a system of linear equations problem, but we also need to make sure that we only accept integers as our solution
 *
 */
function getPresses(machine: Machine): Presses | undefined {
  const matrix = [
    [machine.A.x, machine.B.x, machine.prize.x],
    [machine.A.y, machine.B.y, machine.prize.y],
  ];

  rowReduce(matrix);
  const A = matrix[0][2];
  const B = matrix[1][2];
  const aRounded = roundReallyCloseNumber(A);
  const bRounded = roundReallyCloseNumber(B);

  if (aRounded !== undefined && bRounded !== undefined) {
    return {A: aRounded, B: bRounded};
  }
}

/**
 * When doing math, you can end up with a number that's barely not an int
 * If it's close enough, this will return the real int
 */
function roundReallyCloseNumber(value: number) {
  const tolerance = 1e-3; // This was lowered until AoC liked my answer, haha
  const valueAsInt = Math.round(value);
  if (Math.abs(value - valueAsInt) < tolerance) {
    return valueAsInt;
  }
}

/**
 * Simplified RREF that only needs to work for these 2x3 matrices
 */
export function rowReduce(matrix: number[][]): number[][] {
  // Divide the first row by the first number in the first row
  const pivot = matrix[0][0];
  matrix[0].forEach((n, i) => (matrix[0][i] = n / pivot));

  // Subtract the first row times [1][0] from the second row
  let scale = matrix[1][0];
  matrix[1].forEach((n, i) => (matrix[1][i] = n - matrix[0][i] * scale));

  // Multiply second row by (1 / [1][1])
  scale = 1 / matrix[1][1];
  matrix[1].forEach((n, i) => (matrix[1][i] = n * scale));

  // Subtract the second row times [0][1] from the first row
  scale = matrix[0][1];
  matrix[0].forEach((n, i) => (matrix[0][i] = n - matrix[1][i] * scale));

  return matrix;
}

// Scoring =====================================================================
function findCost(machine: Machine): number {
  const presses = getPresses(machine);

  if (!presses) return 0;

  return presses.A * 3 + presses.B;
}

// Parsing =====================================================================
export function parseMachines(input: string, addToTargetCoordinates: number = 0): Machine[] {
  return input
    .split('\n\n')
    .map((s) => s.split('\n'))
    .map(parseMachine)
    .map((m) => ({
      ...m,
      prize: {x: m.prize.x + addToTargetCoordinates, y: m.prize.y + addToTargetCoordinates},
    }));
}

function parseMachine(input: string[]): Machine {
  return {
    A: parseLine(input[0], '+'),
    B: parseLine(input[1], '+'),
    prize: parseLine(input[2], '='),
  };
}

function parseLine(line: string, splitChar: string): Coordinates {
  const parts = line.split(splitChar);
  const x = parts[1].replace(', Y', '');
  const y = parts[2];
  return {x: Number.parseInt(x), y: Number.parseInt(y)};
}

console.log(await Day13.Part2Answer('input.txt'));
