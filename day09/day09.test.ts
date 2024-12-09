import {test, expect} from 'bun:test';
import {checkSumSimple, Day09} from './day09';

test('Part1 test answer', async () => {
  const answer = await Day09.Part1Answer('test-input.txt');
  expect(answer).toBe(1928);
});

test('Part1 real answer', async () => {
  const answer = await Day09.Part1Answer('input.txt');
  expect(answer).toBe(6421128769094);
});

test.skip('Part2 test answer', async () => {
  const answer = await Day09.Part2Answer('test-input.txt');
  expect(answer).toBe(1);
});

test.skip('Part2 real answer', async () => {
  const answer = await Day09.Part2Answer('input.txt');
  expect(answer).toBe(1);
});

test('checksumSimple', () => {
  expect(checkSumSimple('0099811188827773336446555566')).toBe(1928);
});
