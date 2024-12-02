import {test, expect} from 'bun:test';
import {Day02, isSafe} from './day02';

test('Part1 test answer', async () => {
  const answer = await Day02.Part1Answer('test-input.txt');
  expect(answer).toBe(2);
});

test('Part1 real answer', async () => {
  const answer = await Day02.Part1Answer('input.txt');
  expect(answer).toBe(371);
});

test('Part2 test answer', async () => {
  const answer = await Day02.Part2Answer('test-input.txt');
  expect(answer).toBe(4);
});

test('Part2 real answer', async () => {
  const answer = await Day02.Part2Answer('input.txt');
  expect(answer).toBe(426);
});
