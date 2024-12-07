import {test, expect} from 'bun:test';
import {Day07, getOperators} from './day07';

test('Part1 test answer', async () => {
  const answer = await Day07.Part1Answer('test-input.txt');
  expect(answer).toBe(3749);
});
test('Part1 real answer', async () => {
  const answer = await Day07.Part1Answer('input.txt');
  expect(answer).toBe(2654749936343);
});

test.skip('Part2 test answer', async () => {
  const answer = await Day07.Part2Answer('test-input.txt');
  expect(answer).toBe(1);
});

test.skip('Part2 real answer', async () => {
  const answer = await Day07.Part2Answer('input.txt');
  expect(answer).toBe(1);
});

test('getOperations', () => {
  expect(getOperators(0, 2)).toEqual(['+', '+']);
  expect(getOperators(1, 2)).toEqual(['*', '+']);
  expect(getOperators(2, 2)).toEqual(['+', '*']);
  expect(getOperators(3, 2)).toEqual(['*', '*']);
});
