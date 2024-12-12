import {test, expect} from 'bun:test';
import {Day12, findRegions} from './day12';
import {readLines} from '../utils';

test('Part1 simple test answer', async () => {
  const answer = await Day12.Part1Answer('simple-test-input.txt');
  expect(answer).toBe(140);
});

test('Part1 test answer', async () => {
  const answer = await Day12.Part1Answer('test-input.txt');
  expect(answer).toBe(1930);
});

test('Part1 real answer', async () => {
  const answer = await Day12.Part1Answer('input.txt');
  expect(answer).toBe(1450816);
});

test.skip('Part2 test answer', async () => {
  const answer = await Day12.Part2Answer('test-input.txt');
  expect(answer).toBe(1);
});

test.skip('Part2 real answer', async () => {
  const answer = await Day12.Part2Answer('input.txt');
  expect(answer).toBe(1);
});

test('findRegions', async () => {
  const map = await readLines('simple-test-input.txt');
  expect(findRegions(map)).toEqual([
    {
      plant: 'A',
      plots: [
        {row: 0, col: 0, boundaries: {top: true, right: false, bottom: true, left: true}},
        {row: 0, col: 1, boundaries: {top: true, right: false, bottom: true, left: false}},
        {row: 0, col: 2, boundaries: {top: true, right: false, bottom: true, left: false}},
        {row: 0, col: 3, boundaries: {top: true, right: true, bottom: true, left: false}},
      ],
    },
    {
      plant: 'B',
      plots: [
        {row: 1, col: 0, boundaries: {top: true, right: false, bottom: false, left: true}},
        {row: 1, col: 1, boundaries: {top: true, right: true, bottom: false, left: false}},
        {row: 2, col: 0, boundaries: {top: false, right: false, bottom: true, left: true}},
        {row: 2, col: 1, boundaries: {top: false, right: true, bottom: true, left: false}},
      ],
    },
    {
      plant: 'C',
      plots: [
        {row: 1, col: 2, boundaries: {top: true, right: true, bottom: false, left: true}},
        {row: 2, col: 2, boundaries: {top: false, right: false, bottom: true, left: true}},
        {row: 2, col: 3, boundaries: {top: true, right: true, bottom: false, left: false}},
        {row: 3, col: 3, boundaries: {top: false, right: true, bottom: true, left: true}},
      ],
    },
    {
      plant: 'D',
      plots: [{row: 1, col: 3, boundaries: {top: true, right: true, bottom: true, left: true}}],
    },
    {
      plant: 'E',
      plots: [
        {row: 3, col: 0, boundaries: {top: true, right: false, bottom: true, left: true}},
        {row: 3, col: 1, boundaries: {top: true, right: false, bottom: true, left: false}},
        {row: 3, col: 2, boundaries: {top: true, right: true, bottom: true, left: false}},
      ],
    },
  ]);
});
