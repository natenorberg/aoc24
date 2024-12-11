import {readTextFile} from '../utils';

export const Day11 = {
  async Part1Answer(filename: string) {
    const input = await readTextFile(filename);
    let stones = parseNumbers(input);
    stones = blink(stones, 25);
    return stones.length;
  },
  async Part2Answer(filename: string) {
    const input = await readTextFile(filename);
    return 0;
  },
};

function blink(initialStones: number[], times: number): number[] {
  let stones = [...initialStones];
  for (let i = 0; i < times; i++) {
    stones = stones.flatMap((s) => getNextStones(s));
  }
  return stones;
}

function getNextStones(stone: number): number[] {
  if (stone === 0) {
    return [1];
  }

  // Check for even digit number
  const numberString = stone.toString();
  if (numberString.length % 2 === 0) {
    const stone1 = numberString.slice(0, numberString.length / 2);
    const stone2 = numberString.slice(numberString.length / 2);
    return [stone1, stone2].map((s) => Number.parseInt(s));
  }

  return [stone * 2024];
}

// Parsing======================================================================
function parseNumbers(input: string): number[] {
  return input.split(' ').map((s) => Number.parseInt(s));
}

console.log(await Day11.Part1Answer('input.txt'));
