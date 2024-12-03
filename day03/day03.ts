import {readLines, readTextFile} from '../utils';

export const Day03 = {
  async Part1Answer(filename: string) {
    const input = await readTextFile(filename);
    const instructions = parseInstructions(input);
    let total = 0;
    instructions.forEach(({x, y}) => {
      total += x * y;
    });
    return total;
  },
  async Part2Answer(filename: string) {
    const lines = await readLines(filename);
    return 0;
  },
};

type Instruction = {x: number; y: number};

function parseInstructions(input: string): Instruction[] {
  const instructionStrings = findInstructions(input);
  return instructionStrings.map(parseInstruction);
}

function parseInstruction(input: string): Instruction {
  const numbers = input
    .replace('mul(', '')
    .replace(')', '')
    .split(',')
    .map((n) => Number.parseInt(n));
  return {x: numbers[0], y: numbers[1]};
}

export function findInstructions(input: string) {
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  return Array.from(input.matchAll(regex)).map((v) => v[0]);
}

console.log(await Day03.Part1Answer('input.txt'));
