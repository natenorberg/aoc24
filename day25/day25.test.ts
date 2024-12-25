import {test, expect} from 'bun:test';
import {Day25, parseKey, parseLock} from './day25';

test('Part1 test answer', async () => {
  const answer = await Day25.Part1Answer('test-input.txt');
  expect(answer).toBe(3);
});

test('Part1 real answer', async () => {
  const answer = await Day25.Part1Answer('input.txt');
  expect(answer).toBe(2993);
});

test.skip('Part2 test answer', async () => {
  const answer = await Day25.Part2Answer('test-input.txt');
  expect(answer).toBe(1);
});

test.skip('Part2 real answer', async () => {
  const answer = await Day25.Part2Answer('input.txt');
  expect(answer).toBe(1);
});

const testLock = `
#####
.####
.####
.####
.#.#.
.#...
.....
`
  .trim()
  .split('\n');

test('parseLock', () => {
  expect(parseLock(testLock)).toEqual([0, 5, 3, 4, 3] as any);
});

const testKey = `
.....
#....
#....
#...#
#.#.#
#.###
#####
`
  .trim()
  .split('\n');

test('parseKey', () => {
  expect(parseKey(testKey)).toEqual([5, 0, 2, 1, 3] as any);
});
