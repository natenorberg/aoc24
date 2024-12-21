import {test, expect} from 'bun:test';
import {Day20, findCheats, getSteps} from './day20';
import {readLines} from '../utils';

test('Part1 real answer', async () => {
  const answer = await Day20.Part1Answer('input.txt');
  expect(answer).toBe(1384);
});

test('Part2 real answer', async () => {
  const answer = await Day20.Part2Answer('input.txt');
  expect(answer).toBe(1008542);
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
  expect(cheats[50]).toBe(32);
  expect(cheats[52]).toBe(31);
  expect(cheats[54]).toBe(29);
  expect(cheats[56]).toBe(39);
  expect(cheats[58]).toBe(25);
  expect(cheats[60]).toBe(23);
  expect(cheats[62]).toBe(20);
  expect(cheats[64]).toBe(19);
  expect(cheats[66]).toBe(12);
  expect(cheats[68]).toBe(14);
  expect(cheats[70]).toBe(12);
  expect(cheats[72]).toBe(22);
  expect(cheats[74]).toBe(4);
  expect(cheats[76]).toBe(3);
});
