import {test, expect} from 'bun:test';
import {checkPageList, Day05} from './day05';

test('Part1 test answer', async () => {
  const answer = await Day05.Part1Answer('test-input.txt');
  expect(answer).toBe(143);
});

test('Part1 real answer', async () => {
  const answer = await Day05.Part1Answer('input.txt');
  expect(answer).toBe(6384);
});

// test('Part2 test answer', async () => {
//   const answer = await Day05.Part2Answer('test-input.txt');
//   expect(answer).toBe(9);
// });

// test('Part2 real answer', async () => {
//   const answer = await Day05.Part2Answer('input.txt');
//   expect(answer).toBe(1807);
// });

test('order checking', () => {
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
  expect(checkPageList([75, 47, 61, 53, 29], rules)).toBe(true);
  expect(checkPageList([75, 97, 47, 61, 53], rules)).toBe(false);
});
