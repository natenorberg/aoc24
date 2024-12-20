import {test, expect} from 'bun:test';
import {Day19, getValidArrangements, parseInput} from './day19';
import {readTextFile} from '../utils';

test('Part1 test answer', async () => {
  const answer = await Day19.Part1Answer('test-input.txt');
  expect(answer).toBe(6);
});

test('Part1 real answer', async () => {
  const answer = await Day19.Part1Answer('input.txt');
  expect(answer).toBe(278);
});

test.only('Part2 test answer', async () => {
  const answer = await Day19.Part2Answer('test-input.txt');
  expect(answer).toBe(16);
});

test.skip('Part2 real answer', async () => {
  const answer = await Day19.Part2Answer('input.txt');
  expect(answer).toBe(1);
});

test('test case', async () => {
  const input = await readTextFile('input.txt');
  const {towels} = parseInput(input);
  expect(
    getValidArrangements('brbwrrruwrrrubrwuugrbuuwuuwrwrbrrgububwurugbwwrb', towels),
  ).toBeFalsy();
});
