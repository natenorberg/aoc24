import {test, expect} from 'bun:test';
import {Day04} from './day04';
import {Day04_Alt} from './day04_alt';

test('Part1 test answer', async () => {
  const answer = await Day04.Part1Answer('test-input.txt');
  expect(answer).toBe(18);
});

test('Part1 real answer', async () => {
  const answer = await Day04.Part1Answer('input.txt');
  expect(answer).toBe(2406);
});

test('Part2 test answer', async () => {
  const answer = await Day04.Part2Answer('test-input.txt');
  expect(answer).toBe(9);
});

test('Part2 real answer', async () => {
  const answer = await Day04.Part2Answer('input.txt');
  expect(answer).toBe(1807);
});

test('Part1 test answer (alt)', async () => {
  const answer = await Day04_Alt.Part1Answer('test-input.txt');
  expect(answer).toBe(18);
});

test('Part1 real answer (alt)', async () => {
  const answer = await Day04_Alt.Part1Answer('input.txt');
  expect(answer).toBe(2406);
});

test('Part2 test answer (alt)', async () => {
  const answer = await Day04_Alt.Part2Answer('test-input.txt');
  expect(answer).toBe(9);
});

test('Part2 real answer (alt)', async () => {
  const answer = await Day04_Alt.Part2Answer('input.txt');
  expect(answer).toBe(1807);
});
