import {test, expect} from 'bun:test';
import {checkEquation, Day07, getAllOperators, getSimpleOperators} from './day07';

test('Part1 test answer', async () => {
  const answer = await Day07.Part1Answer('test-input.txt');
  expect(answer).toBe(3749);
});
test('Part1 real answer', async () => {
  const answer = await Day07.Part1Answer('input.txt');
  expect(answer).toBe(2654749936343);
});

test('Part2 test answer', async () => {
  const answer = await Day07.Part2Answer('test-input.txt');
  expect(answer).toBe(11387);
});

test('Part2 real answer', async () => {
  const answer = await Day07.Part2Answer('input.txt');
  expect(answer).toBe(124060392153684);
});

test('getSimpleOperators', () => {
  expect(getSimpleOperators(0, 2)).toEqual(['+', '+']);
  expect(getSimpleOperators(1, 2)).toEqual(['*', '+']);
  expect(getSimpleOperators(2, 2)).toEqual(['+', '*']);
  expect(getSimpleOperators(3, 2)).toEqual(['*', '*']);
});

test('concat operator', () => {
  expect(checkEquation({target: 1234, numbers: [12, 34]}, ['||'])).toBe(true);
});
