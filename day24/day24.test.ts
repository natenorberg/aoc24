import {test, expect} from 'bun:test';
import {Day24, getNumber} from './day24';

test('Part1 small test answer', async () => {
  const answer = await Day24.Part1Answer('small-test-input.txt');
  expect(answer).toBe(4);
});

test('Part1 test answer', async () => {
  const answer = await Day24.Part1Answer('test-input.txt');
  expect(answer).toBe(2024);
});

test('Part1 real answer', async () => {
  const answer = await Day24.Part1Answer('input.txt');
  expect(answer).toBe(59336987801432);
});

test.skip('Part2 test answer', async () => {
  const answer = await Day24.Part2Answer('test-input.txt');
  expect(answer).toBe(1);
});

test.skip('Part2 real answer', async () => {
  const answer = await Day24.Part2Answer('input.txt');
  expect(answer).toBe(1);
});

test('getNumber', () => {
  expect(getNumber([false, false, true])).toBe(4);
});
