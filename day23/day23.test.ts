import {test, expect} from 'bun:test';
import {Day23} from './day23';

test('Part1 test answer', async () => {
  const answer = await Day23.Part1Answer('test-input.txt');
  expect(answer).toBe(7);
});

test('Part1 real answer', async () => {
  const answer = await Day23.Part1Answer('input.txt');
  expect(answer).toBe(1419);
});

test.skip('Part2 test answer', async () => {
  const answer = await Day23.Part2Answer('test-input.txt');
  expect(answer).toBe(1);
});

test.skip('Part2 real answer', async () => {
  const answer = await Day23.Part2Answer('input.txt');
  expect(answer).toBe(1);
});
