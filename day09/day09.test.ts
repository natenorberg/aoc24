import {test, expect} from 'bun:test';
import {Day09} from './day09';

test('Part1 test answer', async () => {
  const answer = await Day09.Part1Answer('test-input.txt');
  expect(answer).toBe(1928);
});

test('Part1 real answer', async () => {
  const answer = await Day09.Part1Answer('input.txt');
  expect(answer).toBe(6421128769094);
});

test('Part2 test answer', async () => {
  const answer = await Day09.Part2Answer('test-input.txt');
  expect(answer).toBe(2858);
});

test('Part2 real answer', async () => {
  const answer = await Day09.Part2Answer('input.txt');
  expect(answer).toBe(6448168620520);
});
