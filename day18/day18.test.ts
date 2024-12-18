import {test, expect} from 'bun:test';
import {Day18} from './day18';

const testDimensions = {width: 7, height: 7};
const testBytes = 12;
const realDimensions = {width: 71, height: 71};
const realBytes = 1024;

test('Part1 test answer', async () => {
  const answer = await Day18.Part1Answer('test-input.txt', testDimensions, testBytes);
  expect(answer).toBe(22);
});

test('Part1 real answer', async () => {
  const answer = await Day18.Part1Answer('input.txt', realDimensions, realBytes);
  expect(answer).toBe(324);
});

test.skip('Part2 test answer', async () => {
  const answer = await Day18.Part2Answer('test-input.txt');
  expect(answer).toBe(1);
});

test.skip('Part2 real answer', async () => {
  const answer = await Day18.Part2Answer('input.txt');
  expect(answer).toBe(1);
});
