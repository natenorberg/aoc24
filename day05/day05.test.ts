import {test, expect} from 'bun:test';
import {checkPageList, Day05, sortPageList} from './day05';

test('Part1 test answer', async () => {
  const answer = await Day05.Part1Answer('test-input.txt');
  expect(answer).toBe(143);
});

test('Part1 real answer', async () => {
  const answer = await Day05.Part1Answer('input.txt');
  expect(answer).toBe(6384);
});

test('Part2 test answer', async () => {
  const answer = await Day05.Part2Answer('test-input.txt');
  expect(answer).toBe(123);
});

test('Part2 real answer', async () => {
  const answer = await Day05.Part2Answer('input.txt');
  expect(answer).toBe(5353);
});

const rules = [
  {before: 47, after: 53},
  {before: 97, after: 13},
  {before: 97, after: 61},
  {before: 97, after: 47},
  {before: 75, after: 29},
  {before: 61, after: 13},
  {before: 75, after: 53},
  {before: 29, after: 13},
  {before: 97, after: 29},
  {before: 53, after: 29},
  {before: 61, after: 53},
  {before: 97, after: 53},
  {before: 61, after: 29},
  {before: 47, after: 13},
  {before: 75, after: 47},
  {before: 97, after: 75},
  {before: 47, after: 61},
  {before: 75, after: 61},
  {before: 47, after: 29},
  {before: 75, after: 13},
  {before: 53, after: 13},
];

test('order checking', () => {
  expect(checkPageList([75, 47, 61, 53, 29], rules)).toBe(true);
  expect(checkPageList([75, 97, 47, 61, 53], rules)).toBe(false);
});

test('resorting', () => {
  expect(sortPageList([75, 97, 47, 61, 53], rules)).toEqual([97, 75, 47, 61, 53]);
  expect(sortPageList([61, 13, 29], rules)).toEqual([61, 29, 13]);
  expect(sortPageList([97, 13, 75, 29, 47], rules)).toEqual([97, 75, 47, 29, 13]);
});
