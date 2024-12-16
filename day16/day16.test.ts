import {test, expect} from 'bun:test';
import {buildGraph, Day16, Direction} from './day16';

test.skip('Part1 test answer', async () => {
  const answer = await Day16.Part1Answer('test-input.txt');
  expect(answer).toBe(7036);
});

test.skip('Part1 real answer', async () => {
  const answer = await Day16.Part1Answer('input.txt');
  expect(answer).toBe(1);
});

test.skip('Part2 test answer', async () => {
  const answer = await Day16.Part2Answer('test-input.txt');
  expect(answer).toBe(1);
});

test.skip('Part2 real answer', async () => {
  const answer = await Day16.Part2Answer('input.txt');
  expect(answer).toBe(1);
});

const simpleMaze = `
##########
#.######E#
#........#
#.###.##.#
#S..#....#
##########
`;

test('createGraph', () => {
  const input = simpleMaze.trim().split('\n');
  expect(buildGraph(input)).toEqual({
    '1-1-N': {row: 1, col: 1, direction: Direction.North, transitions: {}},

    '1-8-N': {row: 1, col: 8, direction: Direction.North, transitions: {}, isEnd: true},

    '2-1-N': {row: 2, col: 1, direction: Direction.North, transitions: {'2-1-E': 1000, '1-1-N': 1}},
    '2-1-E': {
      row: 2,
      col: 1,
      direction: Direction.East,
      transitions: {'2-1-N': 1000, '2-1-S': 1000, '2-5-E': 4},
    },
    '2-1-S': {row: 2, col: 1, direction: Direction.South, transitions: {'2-1-E': 1000, '4-1-S': 2}},
    '2-1-W': {
      row: 2,
      col: 1,
      direction: Direction.West,
      transitions: {'2-1-N': 1000, '2-1-S': 1000},
    },

    '2-5-N': {
      row: 2,
      col: 5,
      direction: Direction.North,
      transitions: {'2-5-W': 1000, '2-5-E': 1000},
    },
    '2-5-E': {row: 2, col: 5, direction: Direction.East, transitions: {'2-5-S': 1000, '2-8-E': 3}},
    '2-5-S': {
      row: 2,
      col: 5,
      direction: Direction.South,
      transitions: {'2-5-E': 1000, '2-5-W': 1000, '4-5-S': 2},
    },
    '2-5-W': {row: 2, col: 5, direction: Direction.West, transitions: {'2-5-S': 1000, '2-1-W': 4}},

    '2-8-N': {row: 2, col: 8, direction: Direction.North, transitions: {'2-8-W': 1000, '1-8-N': 1}},
    '2-8-E': {
      row: 2,
      col: 8,
      direction: Direction.East,
      transitions: {'2-8-N': 1000, '2-8-S': 1000},
    },
    '2-8-S': {row: 2, col: 8, direction: Direction.South, transitions: {'2-8-W': 1000, '4-8-S': 2}},
    '2-8-W': {
      row: 2,
      col: 8,
      direction: Direction.West,
      transitions: {'2-8-N': 1000, '2-8-S': 1000, '2-5-W': 3},
    },

    '4-1-N': {row: 4, col: 1, direction: Direction.North, transitions: {'4-1-E': 1000, '2-1-N': 2}},
    '4-1-E': {row: 4, col: 1, direction: Direction.East, transitions: {'4-1-N': 1000, '4-3-E': 2}},
    '4-1-S': {row: 4, col: 1, direction: Direction.South, transitions: {'4-1-E': 1000}},

    '4-3-E': {row: 4, col: 3, direction: Direction.East, transitions: {}},

    '4-5-N': {row: 4, col: 5, direction: Direction.North, transitions: {'4-5-E': 1000, '2-5-N': 2}},
    '4-5-E': {row: 4, col: 5, direction: Direction.East, transitions: {'4-5-N': 1000, '4-8-E': 3}},
    '4-5-S': {row: 4, col: 5, direction: Direction.South, transitions: {'4-5-E': 1000}},
    '4-5-W': {row: 4, col: 5, direction: Direction.West, transitions: {'4-5-N': 1000}},

    '4-8-N': {row: 4, col: 8, direction: Direction.North, transitions: {'4-8-W': 1000, '2-8-N': 2}},
    '4-8-E': {row: 4, col: 8, direction: Direction.East, transitions: {'4-8-N': 1000}},
    '4-8-S': {row: 4, col: 8, direction: Direction.South, transitions: {'4-8-W': 1000}},
    '4-8-W': {row: 4, col: 8, direction: Direction.West, transitions: {'4-8-N': 1000, '4-5-W': 3}},
  });
});
