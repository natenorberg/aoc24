import {test, expect} from 'bun:test';
import {Day14, RobotDefinition, seconds, simulateRobots} from './day14';

test('Part1 test answer', async () => {
  const answer = await Day14.Part1Answer('test-input.txt', {width: 11, height: 7});
  expect(answer).toBe(12);
});

test('Part1 real answer', async () => {
  const answer = await Day14.Part1Answer('input.txt', {width: 101, height: 103});
  expect(answer).toBe(219512160);
});

test.skip('Part2 test answer', async () => {
  const answer = await Day14.Part2Answer('test-input.txt', {width: 11, height: 7});
  expect(answer).toBe(1);
});

test.skip('Part2 real answer', async () => {
  const answer = await Day14.Part2Answer('input.txt', {width: 101, height: 103});
  expect(answer).toBe(1);
});

test('simulating movement', () => {
  const robotDef: RobotDefinition[] = [{start: {x: 2, y: 4}, velocity: {x: 2, y: -3}}];
  const dimensions = {width: 11, height: 7};
  expect(simulateRobots(robotDef, dimensions, seconds(0))).toEqual([{x: 2, y: 4}]);
  expect(simulateRobots(robotDef, dimensions, seconds(1))).toEqual([{x: 4, y: 1}]);
  expect(simulateRobots(robotDef, dimensions, seconds(2))).toEqual([{x: 6, y: 5}]);
  expect(simulateRobots(robotDef, dimensions, seconds(3))).toEqual([{x: 8, y: 2}]);
  expect(simulateRobots(robotDef, dimensions, seconds(4))).toEqual([{x: 10, y: 6}]);
  expect(simulateRobots(robotDef, dimensions, seconds(5))).toEqual([{x: 1, y: 3}]);
});
