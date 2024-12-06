import {test, expect} from 'bun:test';
import {Day06} from './day06';

test('Part1 test answer', async () => {
  const answer = await Day06.Part1Answer('test-input.txt');
  expect(answer).toBe(41);
});

test('Part1 real answer', async () => {
  const answer = await Day06.Part1Answer('input.txt');
  expect(answer).toBe(5551);
});

test('Part2 test answer', async () => {
  const answer = await Day06.Part2Answer('test-input.txt');
  expect(answer).toBe(6);
});

test('Part2 real answer', async () => {
  const answer = await Day06.Part2Answer('input.txt');
  expect(answer).toBe(1939);
});
