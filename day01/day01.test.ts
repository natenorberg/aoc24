import {test, expect} from 'bun:test';
import {Day01} from './day01';

test('Part1 test answer', async () => {
  const answer = await Day01.Part1Answer('test-input.txt');
  expect(answer).toBe(11);
});

test('Part1 real answer', async () => {
  const answer = await Day01.Part1Answer('input.txt');
  expect(answer).toBe(2430334);
});

test('Part2 test answer', async () => {
  const answer = await Day01.Part2Answer('test-input.txt');
  expect(answer).toBe(31);
});
