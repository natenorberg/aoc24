import {test, expect} from 'bun:test';
import {Day13, parseMachines, rowReduce} from './day13';
import {readTextFile} from '../utils';

test('Part1 test answer', async () => {
  const answer = await Day13.Part1Answer('test-input.txt');
  expect(answer).toBe(480);
});

test('Part1 real answer', async () => {
  const answer = await Day13.Part1Answer('input.txt');
  expect(answer).toBe(36870);
});

test('Part2 real answer', async () => {
  const answer = await Day13.Part2Answer('input.txt');
  expect(answer).toBe(78101482023732);
});

test('parseMachines', async () => {
  const input = await readTextFile('test-input.txt');
  const [machine] = parseMachines(input);
  expect(machine).toEqual({
    A: {x: 94, y: 34},
    B: {x: 22, y: 67},
    prize: {x: 8400, y: 5400},
  });
});

test('rowReduce', () => {
  let input = [
    [17, 84, 7870],
    [86, 37, 6450],
  ];
  expect(rowReduce(input)).toEqual([
    [1, 0, 38],
    [-0, 1, 86],
  ]);
});
