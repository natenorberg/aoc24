import {test, expect} from 'bun:test';
import {Day21, getShortestPath} from './day21';

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

// .^A
// <v>

// 789
// 456
// 123
//  0A

test.skip('179A', () => {
  // let presses = getPressesForNumberPadCode('179A');
  // presses = getPressesForDirectionPadCode(presses);
  // presses = getPressesForDirectionPadCode(presses);
  // expect(presses).toBe('<v<A>>^A<vA<A>>^AAvAA<^A>A<v<A>>^AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A');
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

test('simple dijkstra', () => {
  expect(getShortestPath('029A').length).toBe(
    '<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A'.length,
  );
});
