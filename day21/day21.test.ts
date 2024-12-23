import {test, expect} from 'bun:test';
import {
  Day21,
  directionPadLength,
  getPressesForDirectionPadCode,
  getPressesForNumberPadCode,
  numberPadLength,
} from './day21';

test('Part1 test answer', async () => {
  const answer = await Day21.Part1Answer('test-input.txt');
  expect(answer).toBe(126384);
});

test.skip('Part1 real answer', async () => {
  const answer = await Day21.Part1Answer('input.txt');
  expect(answer).toBe(1);
});

test.skip('Part2 test answer', async () => {
  const answer = await Day21.Part2Answer('test-input.txt');
  expect(answer).toBe(1);
});

test.skip('Part2 real answer', async () => {
  const answer = await Day21.Part2Answer('input.txt');
  expect(answer).toBe(1);
});

test('numberPadLength', () => {
  expect(numberPadLength('029A')).toBe('<A^A>^^AvvvA'.length);
});

test('getPressesForNumberPadCode has correct length', () => {
  expect(getPressesForNumberPadCode('029A').length).toBe('<A^A>^^AvvvA'.length);
});

test('directionPadLength', () => {
  expect(directionPadLength('<A^A>^^AvvvA')).toBe('v<<A>>^A<A>AvA<^AA>A<vAAA>^A'.length);
});

test('getPressesForDirectionPadCode has correct length', () => {
  expect(getPressesForDirectionPadCode('<A^A>^^AvvvA').length).toBe(
    'v<<A>>^A<A>AvA<^AA>A<vAAA>^A'.length,
  );
});

test('full length', () => {
  let presses = getPressesForNumberPadCode('029A');
  presses = getPressesForDirectionPadCode(presses);
  presses = getPressesForDirectionPadCode(presses);
  expect(presses.length).toBe(
    '<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A'.length,
  );
});

// .^A
// <v>

// 789
// 456
// 123
//  0A

test.skip('179A', () => {
  let presses = getPressesForNumberPadCode('179A');
  presses = getPressesForDirectionPadCode(presses);
  presses = getPressesForDirectionPadCode(presses);
  expect(presses).toBe('<v<A>>^A<vA<A>>^AAvAA<^A>A<v<A>>^AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A');
  // expect(presses).toBe('<v<A>>^A<vA<A>>^AAvAA<^A>A<v<A>>^AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A');
  //                       <   A  v <   AA >>  ^ A   <   AA > A  v  AA ^ A   < v  AAA >  ^ A
  // <Av<AA>>^A<AA>AvAA^A<vAAA>^A
  //  ^  <<   A ^^ A >> A  vvv  A
  // ^<<A^^A>>AvvvA
  //    1  7  9   A

  // <vA<AA>>^AAvA<^A>AvA^Av<<A>>^AAvA^A<vA>^AA<A>Av<<A>A>^AAAvA<^A>A
  //   v <<   AA >  ^ A > A   <   AA > A  v  AA ^ A   < v  AAA >  ^ A
  // v<<AA>^A>A<AA>AvAA^A<vAAA>^A
  //    <<  ^ A ^^ A >> A  vvv  A
  // <<^A^^A>>AvvvA
});

test.skip('379A', () => {
  let presses = getPressesForNumberPadCode('379A');
  expect(presses).toBe('^A<<^^A>>AvvvA');
  presses = getPressesForDirectionPadCode(presses);
  expect(presses).toBe('<A>Av<<AA>^AA>AvAA^A<vAAA>^A');
  //                     ^ A   <<  ^^ A >> A  vvv  A
  presses = getPressesForDirectionPadCode(presses);
  expect(presses).toBe('<v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A');
  //                       <   A > A  v <<   AA >  ^ AA > A  v  AA ^ A   < v  AAA >  ^ A
});
