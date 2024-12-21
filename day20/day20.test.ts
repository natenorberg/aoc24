import {test, expect} from 'bun:test';
import {Day20, findCheats, getSteps} from './day20';
import {readLines} from '../utils';

test('Part1 real answer', async () => {
  const answer = await Day20.Part1Answer('input.txt');
  expect(answer).toBe(1384);
});

test.skip('Part2 test answer', async () => {
  const answer = await Day20.Part2Answer('test-input.txt');
  expect(answer).toBe(1);
});

test.skip('Part2 real answer', async () => {
  const answer = await Day20.Part2Answer('input.txt');
  expect(answer).toBe(1);
});

test('getSteps', async () => {
  const maze = await readLines('test-input.txt');
  const steps = getSteps(maze);
  expect(steps.length).toBe(85);
  expect(steps.at(-1)?.id).toBe(84);
});

test('findCheats', async () => {
  const maze = await readLines('test-input.txt');
  const steps = getSteps(maze);
  const cheats = findCheats(steps, 2);
  expect(cheats).toEqual({
    2: 14,
    4: 14,
    6: 2,
    8: 4,
    10: 2,
    12: 3,
    20: 1,
    36: 1,
    38: 1,
    40: 1,
    64: 1,
  });
});

test('findCheats part 2', async () => {
  const maze = await readLines('test-input.txt');
  const steps = getSteps(maze);
  const cheats = findCheats(steps, 20);
  expect(cheats).toEqual({
    50: 32,
    52: 31,
    54: 29,
    56: 39,
    58: 25,
    60: 23,
    62: 20,
    64: 19,
    66: 12,
    68: 14,
    70: 12,
    72: 22,
    74: 4,
    76: 3,
  });
});
