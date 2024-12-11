import {readTextFile, sumByFunc} from '../utils';

export const Day11 = {
  async Part1Answer(filename: string) {
    const input = await readTextFile(filename);
    let stones = parseNumbers(input);
    stones = blink(stones, 25);
    return stones.length;
  },
  async Part1AnswerWithRecursion(filename: string) {
    const input = await readTextFile(filename);
    let stones = parseNumbers(input);
    return countStonesAfterBlinks(stones, 25);
  },
  async Part2Answer(filename: string) {
    const input = await readTextFile(filename);
    let stones = parseNumbers(input);
    return countStonesAfterBlinks(stones, 75);
  },
};

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

// Part 1: Simple flat map =====================================================
function blink(initialStones: number[], times: number = 1): number[] {
  let stones = [...initialStones];
  for (let i = 0; i < times; i++) {
    stones = stones.flatMap((s) => getNextStones(s));
  }
  return stones;
}

// Part 2: Recursion + memory ==================================================
function countStonesAfterBlinks(initialStones: number[], times: number): number {
  let stones = [...initialStones];
  let savedValues: Record<number, number[]> = {};

  function saveValue(stone: number, blinksLeft: number, value: number) {
    if (savedValues[stone] === undefined) {
      savedValues[stone] = [];
    }

    savedValues[stone][blinksLeft] = value;
  }

  function getCount(stone: number, blinksLeft: number): number {
    // Check for stored value
    if (savedValues[stone]?.[blinksLeft] !== undefined) {
      return savedValues[stone][blinksLeft];
    }

    // Base case: no blinks left
    if (blinksLeft === 0) {
      saveValue(stone, 0, 1);
      return 1;
    }

    const nextStones = getNextStones(stone);
    const value = sumByFunc(nextStones, (s) => getCount(s, blinksLeft - 1));
    saveValue(stone, blinksLeft, value);
    return value;
  }

  return sumByFunc(stones, (s) => getCount(s, times));
}

// Parsing======================================================================
function parseNumbers(input: string): number[] {
  return input.split(' ').map((s) => Number.parseInt(s));
}
