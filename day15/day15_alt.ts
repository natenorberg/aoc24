import {readTextFile} from '../utils';

/**
 * This was my first way of solving the problem by modifying the map, rather
 * than parsing out individual entities
 *
 * This way only works for part 1 and my part 2 solutions works for both parts,
 * but I wanted to keep this method in the repo as well
 */
export const Day15_Alt = {
  async Part1Answer(filename: string) {
    const input = await readTextFile(filename);
    const {map, directions} = parseInput(input);
    const finalMap = runDirections(map, directions);
    return getGpsCoordinates(finalMap);
  },
};

export enum Item {
  Robot = '@',
  Box = 'O',
  Wall = '#',
  Empty = '.',
}

export enum Direction {
  Up = '^',
  Down = 'v',
  Left = '<',
  Right = '>',
}

type Point = {row: number; col: number};

function runDirections(initialMap: Item[][], directions: Direction[]): Item[][] {
  let map = initialMap;
  directions.forEach((direction) => {
    map = nextMap(map, direction);
  });
  return map;
}

function nextMap(map: Item[][], direction: Direction): Item[][] {
  const currentPoint = getCurrentPoint(map);
  const nextMove = determineMove(currentPoint, direction, map);
  if (nextMove.type === 'blocked') {
    return map;
  }
  if (nextMove.type === 'push') {
    nextMove.boxes.forEach((b) => {
      map[b.row][b.col] = Item.Box;
    });
  }

  map[nextMove.to.row][nextMove.to.col] = Item.Robot;
  map[currentPoint.row][currentPoint.col] = Item.Empty;

  return map;
}

function getCurrentPoint(map: Item[][]): Point {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === Item.Robot) {
        return {row: i, col: j};
      }
    }
  }
  throw new Error('lost the bot');
}

type BlockedMove = {type: 'blocked'};
type SimpleMove = {type: 'move'; to: Point};
type PushMove = {type: 'push'; boxes: Point[]; to: Point};
type Move = BlockedMove | SimpleMove | PushMove;

export function determineMove(from: Point, direction: Direction, map: Item[][]): Move {
  const nextPoint = getNextPoint(from, direction);
  const nextItem = map[nextPoint.row][nextPoint.col];

  switch (nextItem) {
    case Item.Wall:
      return {type: 'blocked'};
    case Item.Empty:
      return {type: 'move', to: nextPoint};
    case Item.Box:
      const pushResult = determineMove(nextPoint, direction, map);
      switch (pushResult.type) {
        case 'blocked':
          return {type: 'blocked'};
        case 'move':
          return {type: 'push', boxes: [pushResult.to], to: nextPoint};
        case 'push':
          return {type: 'push', boxes: [...pushResult.boxes, pushResult.to], to: nextPoint};
      }
    default:
      throw new Error('Invalid type');
  }
}

function getNextPoint(point: Point, direction: Direction): Point {
  switch (direction) {
    case Direction.Up:
      return {...point, row: point.row - 1};
    case Direction.Down:
      return {...point, row: point.row + 1};
    case Direction.Left:
      return {...point, col: point.col - 1};
    case Direction.Right:
      return {...point, col: point.col + 1};
  }
}

// Scoring =====================================================================
function getGpsCoordinates(map: Item[][]): number {
  let total = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === Item.Box) {
        total += 100 * i + j;
      }
    }
  }

  return total;
}

// Parsing =====================================================================
function parseInput(input: string) {
  const parts = input.split('\n\n');
  return {
    map: parseMap(parts[0].split('\n')),
    directions: parseDirections(parts[1]),
  };
}

function parseMap(input: string[]): Item[][] {
  return input.map((row) => row.split('').map((item) => item as Item));
}

function parseDirections(input: string): Direction[] {
  return input.split('').filter((d) => Object.values(Direction).includes(d as any)) as Direction[];
}

// Debug =======================================================================
function printMap(map: Item[][]) {
  console.log(map.map((line) => line.join('')).join('\n'));
}

// console.log(await Day15.Part1Answer('input.txt'));
