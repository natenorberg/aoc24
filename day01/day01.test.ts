import {test, expect} from 'bun:test';
import {Day01} from './day01';

test('Part1 test answer', async () => {
  const answer = await Day01.Part1Answer('test-input.txt');
  expect(answer).toBe(11);
});
