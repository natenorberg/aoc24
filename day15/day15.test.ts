import {test, expect} from 'bun:test';
import {Day15, Direction} from './day15';
import {Day15_Alt, determineMove, Item} from './day15_alt';

test('Part1 small test answer', async () => {
  const answer = await Day15.Part1Answer('small-test-input.txt');
  expect(answer).toBe(2028);
});

test('Part1 large test answer', async () => {
  const answer = await Day15.Part1Answer('large-test-input.txt');
  expect(answer).toBe(10092);
});

test('Part1 real answer', async () => {
  const answer = await Day15.Part1Answer('input.txt');
  expect(answer).toBe(1509863);
});

test('Part1 alt small test answer', async () => {
  const answer = await Day15_Alt.Part1Answer('small-test-input.txt');
  expect(answer).toBe(2028);
});

test('Part1 alt large test answer', async () => {
  const answer = await Day15_Alt.Part1Answer('large-test-input.txt');
  expect(answer).toBe(10092);
});

test('Part1 alt real answer', async () => {
  const answer = await Day15_Alt.Part1Answer('input.txt');
  expect(answer).toBe(1509863);
});

test('Part2 test answer', async () => {
  const answer = await Day15.Part2Answer('large-test-input.txt');
  expect(answer).toBe(9021);
});

test('Part2 real answer', async () => {
  const answer = await Day15.Part2Answer('input.txt');
  expect(answer).toBe(1548815);
});

function getTestMap(input: string): Item[][] {
  return input
    .trim()
    .split('\n')
    .map((line) => line.split('') as Item[]);
}
const testMap1 = getTestMap(`
########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########
`);

test('determineMove blocked', () => {
  expect(determineMove({row: 2, col: 2}, Direction.Left, testMap1)).toEqual({
    type: 'blocked',
  });
});

test('determineMove simple move', () => {
  expect(determineMove({row: 2, col: 2}, Direction.Up, testMap1)).toEqual({
    type: 'move',
    to: {row: 1, col: 2},
  });
});

const push1TestMap = getTestMap(`
########
#.@O.O.#
##..O..#
#...O..#
#.#.O..#
#...O..#
#......#
########
`);

test('determineMove push 1 box', () => {
  expect(determineMove({row: 1, col: 2}, Direction.Right, push1TestMap)).toEqual({
    type: 'push',
    boxes: [{row: 1, col: 4}],
    to: {row: 1, col: 3},
  });
});

const push2TestMap = getTestMap(`
########
#..@OO.#
##..O..#
#...O..#
#.#.O..#
#...O..#
#......#
########
`);

test('determineMove push multiple boxes', () => {
  expect(determineMove({row: 1, col: 3}, Direction.Right, push2TestMap)).toEqual({
    type: 'push',
    boxes: [
      {row: 1, col: 6},
      {row: 1, col: 5},
    ],
    to: {row: 1, col: 4},
  });
});

const blockedPushTestMap = getTestMap(`
########
#...@OO#
##..O..#
#...O..#
#.#.O..#
#...O..#
#......#
########
`);

test('determineMove blocked push', () => {
  expect(determineMove({row: 1, col: 4}, Direction.Right, blockedPushTestMap)).toEqual({
    type: 'blocked',
  });
});
