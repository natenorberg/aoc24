import {test, expect} from 'bun:test';
import {Day03, findInstructions} from './day03';

test('Part1 test answer', async () => {
  const answer = await Day03.Part1Answer('test-input.txt');
  expect(answer).toBe(161);
});

test('findInstructions', () => {
  const input = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';
  expect(findInstructions(input, true)).toEqual(['mul(2,4)', 'mul(5,5)', 'mul(11,8)', 'mul(8,5)']);
});

test('Part1 real answer', async () => {
  const answer = await Day03.Part1Answer('input.txt');
  expect(answer).toBe(173517243);
});

test('Part2 test answer', async () => {
  const answer = await Day03.Part2Answer('test-input2.txt');
  expect(answer).toBe(48);
});

test('Part2 real answer', async () => {
  const answer = await Day03.Part2Answer('input.txt');
  expect(answer).toBe(100450138);
});
