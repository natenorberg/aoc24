import {test, expect} from 'bun:test';
import {Day10} from './day10';

test('Part1 test answer', async () => {
  const answer = await Day10.Part1Answer('test-input.txt');
  expect(answer).toBe(36);
});

test('Part1 real answer', async () => {
  const answer = await Day10.Part1Answer('input.txt');
  expect(answer).toBe(496);
});

test('Part2 test answer', async () => {
  const answer = await Day10.Part2Answer('test-input.txt');
  expect(answer).toBe(81);
});

test('Part2 real answer', async () => {
  const answer = await Day10.Part2Answer('input.txt');
  expect(answer).toBe(1120);
});

test('Part1 simple test answer', async () => {
  const answer = await Day10.Part1Answer('simple-test-input.txt');
  expect(answer).toBe(1);
});
