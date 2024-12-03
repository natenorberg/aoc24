import {readTextFile} from '../utils';

export const Day03 = {
  async Part1Answer(filename: string) {
    const input = await readTextFile(filename);
    const instructions = parseInstructions(input, false);
    let total = 0;
    instructions.forEach((instruction) => {
      if (instruction.type === 'multiply') {
        const {x, y} = instruction;
        total += x * y;
      }
    });
    return total;
  },
  async Part2Answer(filename: string) {
    const input = await readTextFile(filename);
    const instructions = parseInstructions(input, true);
    let total = 0;
    let enabled = true;
    instructions.forEach((instruction) => {
      switch (instruction.type) {
        case 'do':
          enabled = true;
          break;
        case 'dont':
          enabled = false;
          break;
        case 'multiply':
          if (enabled) {
            const {x, y} = instruction;
            total += x * y;
          }
      }
    });
    return total;
  },
};

type MultiplyInstruction = {type: 'multiply'; x: number; y: number};
type Instruction = MultiplyInstruction | {type: 'do'} | {type: 'dont'};

function parseInstructions(input: string, includeConditionals: boolean): Instruction[] {
  const instructionStrings = findInstructions(input, includeConditionals);
  return instructionStrings.map(parseInstruction);
}

function parseInstruction(input: string): Instruction {
  if (input.startsWith("don't")) {
    return {type: 'dont'};
  }
  if (input.startsWith('do')) {
    return {type: 'do'};
  }
  const numbers = input
    .replace('mul(', '')
    .replace(')', '')
    .split(',')
    .map((n) => Number.parseInt(n));
  return {type: 'multiply', x: numbers[0], y: numbers[1]};
}

export function findInstructions(input: string, includeConditionals: boolean) {
  const regex = includeConditionals
    ? /mul\(\d{1,3},\d{1,3}\)|do\(\)|don\'t\(\)/g
    : /mul\(\d{1,3},\d{1,3}\)/g;
  return Array.from(input.matchAll(regex)).map((v) => v[0]);
}

console.log(await Day03.Part2Answer('input.txt'));
