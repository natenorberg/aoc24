import {test, expect} from 'bun:test';
import {Day08} from './day08';

test('Part1 test answer', async () => {
  const answer = await Day08.Part1Answer('test-input.txt');
  expect(answer).toBe(14);
});

test('Part1 real answer', async () => {
  const answer = await Day08.Part1Answer('input.txt');
  expect(answer).toBe(295);
});

test('Part2 test answer', async () => {
  const answer = await Day08.Part2Answer('test-input.txt');
  expect(answer).toBe(34);
});

test('Part2 real answer', async () => {
  const answer = await Day08.Part2Answer('input.txt');
  expect(answer).toBe(1034);
});

test('Part2 simple test', async () => {
  const answer = await Day08.Part2Answer('simple-test-input.txt');
  expect(answer).toBe(9);
});
