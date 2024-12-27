import {test, expect} from 'bun:test';
import {Day21, getShortestPath} from './day21';

test('Part1 test answer', async () => {
  const answer = await Day21.Part1Answer('test-input.txt');
  expect(answer).toBe(126384);
});

test('Part1 real answer', async () => {
  const answer = await Day21.Part1Answer('input.txt');
  expect(answer).toBe(157892);
});

test.skip('Part2 test answer', async () => {
  const answer = await Day21.Part2Answer('test-input.txt');
  expect(answer).toBe(1);
});

test.skip('Part2 real answer', async () => {
  const answer = await Day21.Part2Answer('input.txt');
  expect(answer).toBe(1);
});

test('029A', () => {
  expect(getShortestPath('029A').length).toBe(
    '<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A'.length,
  );
});
