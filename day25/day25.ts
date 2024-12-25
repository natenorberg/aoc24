import {readTextFile} from '../utils';

export const Day25 = {
  async Part1Answer(filename: string) {
    const input = await readTextFile(filename);
    const {locks, keys} = parseInput(input);
    return checkFits(locks, keys);
  },
  async Part2Answer(filename: string) {
    const input = await readTextFile(filename);
    return 0;
  },
};

export type Key = [number, number, number, number, number];
export type Lock = [number, number, number, number, number];

function checkFits(locks: Lock[], keys: Key[]): number {
  let fits = 0;
  locks.forEach((lock) => {
    keys.forEach((key) => {
      if (isFit(lock, key)) {
        fits++;
      }
    });
  });

  return fits;
}

function isFit(lock: Lock, key: Key): boolean {
  for (let i = 0; i < lock.length; i++) {
    if (lock[i] + key[i] > 5) {
      return false;
    }
  }
  return true;
}

// Parsing =====================================================================
function parseInput(input: string): {keys: Key[]; locks: Lock[]} {
  let keys: Key[] = [];
  let locks: Lock[] = [];
  const schematics = input.split('\n\n');

  schematics.forEach((s) => {
    if (s[0] === '#') {
      locks.push(parseLock(s.split('\n')));
    } else {
      keys.push(parseKey(s.split('\n')));
    }
  });

  return {keys, locks};
}

export function parseLock(input: string[]): Lock {
  let heights: Lock = [0, 0, 0, 0, 0];
  for (let i = 1; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
      if (input[i][j] === '#') {
        heights[j]++;
      }
    }
  }
  return heights;
}

export function parseKey(input: string[]): Key {
  let heights: Key = [0, 0, 0, 0, 0];
  for (let i = 5; i >= 0; i--) {
    for (let j = 0; j < 6; j++) {
      if (input[i][j] === '#') {
        heights[j]++;
      }
    }
  }
  return heights;
}

// console.log(await Day25.Part1Answer('input.txt'));
