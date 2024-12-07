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
    const equations = lines.map(parseEquation);
    const solvable = equations.filter(checkSolvableWithConcat);
    return sumProperty(solvable, 'target');
  },
};

type Equation = {
  target: number;
  numbers: number[];
};

type Operator = '+' | '*' | '||';

export function checkEquation(equation: Equation, operators: Operator[]) {
  const result = operators.reduce((prev, operator, i) => {
    switch (operator) {
      case '+':
        return prev + equation.numbers[i + 1];
      case '*':
        return prev * equation.numbers[i + 1];
      case '||':
        return Number.parseInt(prev.toString() + equation.numbers[i + 1].toString());
    }
  }, equation.numbers[0]);

  return result === equation.target;
}

// Parsing======================================================================
function parseEquation(input: string): Equation {
  const parts = input.split(': ');
  return {
    target: Number.parseInt(parts[0]),
    numbers: parts[1].split(' ').map((n) => Number.parseInt(n)),
  };
}

// Part 1 ======================================================================
function checkSolvable(equation: Equation): boolean {
  const numOperators = equation.numbers.length - 1;
  const numPossibleCombinations = 2 ** numOperators;

  for (let i = 0; i < numPossibleCombinations; i++) {
    const operators = getSimpleOperators(i, numOperators);
    if (checkEquation(equation, operators)) {
      return true;
    }
  }

  return false;
}

export function getSimpleOperators(index: number, numOperations: number): Operator[] {
  return Array.from({length: numOperations}, (_, i) => {
    return isBitSet(index, i) ? '*' : '+';
  });
}

function isBitSet(value: number, position: number): boolean {
  const mask = 1 << position;
  return (value & mask) !== 0;
}

// Part 2 ======================================================================
function checkSolvableWithConcat(equation: Equation): boolean {
  const numOperators = equation.numbers.length - 1;
  const numPossibleCombinations = 3 ** numOperators;

  for (let i = 0; i < numPossibleCombinations; i++) {
    const operators = getAllOperators(i, numOperators);
    if (checkEquation(equation, operators)) {
      return true;
    }
  }

  return false;
}
export function getAllOperators(index: number, numOperators: number): Operator[] {
  const operators = Array.from({length: numOperators}, (_, i) => {
    return getOperatorForPosition(index, i + 1);
  });
  return operators;
}

function getOperatorForPosition(index: number, position: number): Operator {
  // Note: This could be used to build out the operators for part 1 too,
  //       if we added a parameter for what base to use

  // 1st: index % 3
  // 2nd: floor(index / 3) % 3
  // 3rd: floor(index / 3^2) % 3
  // nth: floor(index / 3^(n-1)) % 3
  const value = Math.floor(index / 3 ** (position - 1)) % 3;

  switch (value) {
    case 0:
      return '+';
    case 1:
      return '*';
    case 2:
      return '||';
  }
  throw new Error('missed something');
}

// console.log(await Day07.Part2Answer('input.txt'));
