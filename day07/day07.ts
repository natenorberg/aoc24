import {readLines, sumProperty} from '../utils';

export const Day07 = {
  async Part1Answer(filename: string) {
    const lines = await readLines(filename);
    const equations = lines.map(parseEquation);
    const solvable = equations.filter(checkSolvable);
    return sumProperty(solvable, 'target');
  },
  async Part2Answer(filename: string) {
    const lines = await readLines(filename);
    return 0;
  },
};

type Equation = {
  target: number;
  numbers: number[];
};

type Operator = '+' | '*';

function checkSolvable(equation: Equation): boolean {
  const numOperators = equation.numbers.length - 1;
  const numPossibleCombinations = 2 ** numOperators;

  for (let i = 0; i < numPossibleCombinations; i++) {
    const operators = getOperators(i, numOperators);
    if (checkEquation(equation, operators)) {
      return true;
    }
  }

  return false;
}

export function getOperators(index: number, numOperations: number): Operator[] {
  return Array.from({length: numOperations}, (_, i) => {
    return isBitSet(index, i) ? '*' : '+';
  });
}

function isBitSet(value: number, position: number): boolean {
  const mask = 1 << position;
  return (value & mask) !== 0;
}

function checkEquation(equation: Equation, operators: Operator[]) {
  const result = operators.reduce((prev, operator, i) => {
    switch (operator) {
      case '+':
        return prev + equation.numbers[i + 1];
      case '*':
        return prev * equation.numbers[i + 1];
    }
  }, equation.numbers[0]);

  return result === equation.target;
}

function parseEquation(input: string): Equation {
  const parts = input.split(': ');
  return {
    target: Number.parseInt(parts[0]),
    numbers: parts[1].split(' ').map((n) => Number.parseInt(n)),
  };
}

console.log(await Day07.Part1Answer('input.txt'));
