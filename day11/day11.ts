import {readTextFile, sumByFunc} from '../utils';

export const Day11 = {
  async Part1Answer(filename: string) {
    const input = await readTextFile(filename);
    let stones = parseNumbers(input);
    stones = blink(stones, 25);
    return stones.length;
  },
  async Part2Answer(filename: string) {
    const input = await readTextFile(filename);
    let stones = parseNumbers(input);
    stones = blink(stones, 75);
    return stones.length;
  },
};

function blink(initialStones: number[], times: number = 1): number[] {
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

// console.log(await Day11.Part2Answer('test-input.txt'));

function getZeroSequence(iterations = 40): number[] {
  let sequence = [1];
  let stones = [0];

  for (let i = 0; i < iterations; i++) {
    stones = blink(stones);
    sequence.push(stones.length);
  }

  return sequence;
}

let testStones = parseNumbers('1117 0 8 21078 2389032 142881 93 385');
// let testStones = [125, 17];
let uniqueStones = [...testStones];

// Experiment. After each blink, filter out stones we've seen before
// This runs super fast
// for (let i = 0; i < 75; i++) {
//   testStones = blink(testStones);
//   testStones = testStones.filter((n) => !uniqueStones.includes(n));
//   uniqueStones.push(...testStones);
//   console.log('blink', i, uniqueStones.length);
// }

// type BlinkInfo = {
//   blinksLeft: number;
//   stoneCount: Record<number, number>;
// };

// function countStones(stones: number[]) {
//   return stones.reduce((counts, stone) => {
//     const prevCount = counts[stone] ?? 0;
//     return {...counts, [stone]: prevCount + 1};
//   }, {} as Record<number, number>);
// }

// console.log({blinksLeft: 25, stoneCount: countStones(testStones)});

// for (let i = 0; testStones.length; i++) {
//   testStones = blink(testStones);
//   testStones = testStones.filter((n) => !uniqueStones.includes(n));
//   uniqueStones.push(...testStones);
//   uniqueStones = Array.from(new Set(uniqueStones));
//   console.log('blink', i, testStones.length, uniqueStones.length);
// }
// console.log(uniqueStones);

// console.log('======================================================');

// type BlinkInfo = {
//   iteration: number;
//   nonZeroStones: number[];
//   zeros: number;
// };
// const regularRuns = 25;
// const totalRuns = 75;

// for (let i = 0; i < regularRuns; i++) {
//   testStones = blink(testStones, 1);
//   // testStones.forEach((s) => uniqueStones.add(s));
//   console.log('Blink ', i + 1, testStones.length);
//   // console.log('Unique stones ', uniqueStones.size);
// }

// const counts: Record<number, number> = testStones.reduce((counts, stone) => {
//   const prevCount = counts[stone] ?? 0;
//   return {...counts, [stone]: prevCount + 1};
// }, {});

// console.log(counts);

// let optimizedRuns: BlinkInfo[] = [];

// for (let i = regularRuns; i < totalRuns; i++) {
//   testStones = blink(testStones, 1);
//   const lengthWithZeros = testStones.length;
//   testStones = testStones.filter((n) => !!n);
//   optimizedRuns.push({
//     iteration: i,
//     nonZeroStones: testStones,
//     zeros: lengthWithZeros - testStones.length,
//   });
//   console.log('Blink ', i + 1, testStones.length, lengthWithZeros - testStones.length);
// }

// const zeroSequence = getZeroSequence(40);

// const stonesFromZeros = optimizedRuns.reduce((prev, run) => {
//   const blinksToTarget = totalRuns - run.iteration - 1;
//   console.log(run, blinksToTarget);

//   return prev + run.zeros * zeroSequence[blinksToTarget];
// }, 0);

// console.log('testStones', testStones.length);
// console.log('stonesFromZeros', stonesFromZeros);
// console.log('total', testStones.length + stonesFromZeros);

// let testStones = [0];
// let uniqueStones = new Set<number>();

// for (let i = 0; i < 75; i++) {
//   testStones = blink(testStones, 1);
//   // testStones.forEach((s) => uniqueStones.add(s));
//   console.log('Blink ', i + 1, testStones.length);
//   // console.log('Unique stones ', uniqueStones.size);
// }

// console.log(Array.from(uniqueStones));

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

const twentyFiveRuns = sumByFunc(testStones, (s) => getCount(s, 75));
console.log(twentyFiveRuns);

// const saved: Record<number, number[]> = {
//   0: [1, 1, 1],
//   1: [1, 1, 2, 4],
//   2: [1, 1],
//   4: [1, 1],
//   7: [1, 1, 1, 2],
//   17: [1, 2, 2, 3, 6],
//   20: [1, 2, 2],
//   24: [1, 2, 2],
//   28: [1],
//   32: [1],
//   60: [1],
//   67: [1],
//   72: [1, 2],
//   125: [1, 1, 2, 2, 3],
//   253: [1, 1, 2],
//   512: [1, 1],
//   2024: [1, 2, 4, 4],
//   2867: [1, 2],
//   4048: [1],
//   6032: [1, 2],
//   8096: [1],
//   14168: [1, 1, 2, 4],
//   253000: [1, 2, 2, 3],
//   512072: [1, 2, 3],
//   1036288: [1],
//   28676032: [1, 2, 4],
// };

// getCount(125, 6) +                                               getCount(17, 6);
// getCount(253000, 5) +                                            getCount(1, 5), +                                                            getCount(7, 5);
// getCount(253, 4) +                           getCount(0, 4) +    getCount(2024, 4) +                                                          getCount(14168, 4);
// getCount(512072, 3) +                        getCount(1, 3) +    getCount(20, 3) +                    getCount(24, 3) +                       getCount(28676032, 3);
// getCount(512, 2) +     getCount(72, 2) +     getCount(2024, 2) + getCount(2, 2) +    getCount(0, 2) + getCount(2, 2) +    getCount(4, 2) +    getCount(2867, 2) +                 getCount(6032, 2)
// getCount(1036288, 1) + 1 + getCount(2, 1) +  4 +                 getCount(4048, 1) + 1              + getCount(4048, 1) + getCount(8096, 1) + getCount(28, 1) + getCount(67, 1) + getCount(60, 1) + getCount(32, 1)
