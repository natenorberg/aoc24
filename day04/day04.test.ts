import {test, expect} from 'bun:test';
import {Day04} from './day04';

test('Part1 test answer', async () => {
  const answer = await Day04.Part1Answer('test-input.txt');
  expect(answer).toBe(18);
});
