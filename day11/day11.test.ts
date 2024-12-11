import {test, expect} from 'bun:test';
import {Day11} from './day11';

test('Part1 test answer', async () => {
  const answer = await Day11.Part1Answer('test-input.txt');
  expect(answer).toBe(55312);
});

test('Part1 real answer', async () => {
  const answer = await Day11.Part1Answer('input.txt');
  expect(answer).toBe(224529);
});

test('Part2 test answer', async () => {
  const answer = await Day11.Part1AnswerWithRecursion('test-input.txt');
  expect(answer).toBe(55312); // Same as part 1, but different algorithm
});

test('Part2 real answer', async () => {
  const answer = await Day11.Part2Answer('input.txt');
  expect(answer).toBe(266820198587914);
});
