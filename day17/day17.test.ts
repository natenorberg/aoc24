import {test, expect} from 'bun:test';
import {Day17, Op, parseMachine, runInstruction, runMachine} from './day17';
import {readTextFile} from '../utils';

test('Part1 test answer', async () => {
  const answer = await Day17.Part1Answer('test-input.txt');
  expect(answer).toBe('4,6,3,5,6,3,5,2,1,0');
});

test('Part1 real answer', async () => {
  const answer = await Day17.Part1Answer('input.txt');
  expect(answer).toBe('1,7,6,5,1,0,5,0,7');
});

test.skip('Part2 test answer', async () => {
  const answer = await Day17.Part2Answer('test-input.txt');
  expect(answer).toBe(1);
});

test.skip('Part2 real answer', async () => {
  const answer = await Day17.Part2Answer('input.txt');
  expect(answer).toBe(1);
});

test('parsing', async () => {
  const input = await readTextFile('test-input.txt');
  expect(parseMachine(input)).toEqual({
    state: {registers: {A: 729, B: 0, C: 0}, nextInstruction: 0},
    instructions: [Op.adv, Op.bxl, Op.out, Op.bxc, Op.jnz, Op.adv],
  });
});

const blankState = {registers: {A: 0, B: 0, C: 0}, nextInstruction: 0};

test('test case 1', () => {
  let state = {...blankState};
  state.registers.C = 9;
  expect(runInstruction(2 as Op, 6, state).nextState.registers.B).toBe(1);
});

test('test case 2', () => {
  let state = {...blankState};
  state.registers.A = 10;
  expect(runMachine({state, instructions: [5, 0, 5, 1, 5, 4]}).output).toEqual([0, 1, 2]);
});

test('test case 3', () => {
  let state = {...blankState};
  state.registers.A = 2024;
  const {output, finalState} = runMachine({state, instructions: [0, 1, 5, 4, 3, 0]});
  expect(output).toEqual([4, 2, 5, 6, 7, 7, 7, 7, 3, 1, 0]);
  expect(finalState.registers.A).toBe(0);
});

test('test case 4', () => {
  let state = {...blankState};
  state.registers.B = 29;
  expect(runMachine({state, instructions: [1, 7]}).finalState.registers.B).toBe(26);
});

test('test case 5', () => {
  let state = {...blankState};
  state.registers.B = 2024;
  state.registers.C = 43690;
  expect(runMachine({state, instructions: [4, 0]}).finalState.registers.B).toBe(44354);
});
