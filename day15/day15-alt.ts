import {readTextFile} from '../utils';

export const Day15_Alt = {
  async Part1Answer(filename: string) {
    const input = await readTextFile(filename);
    const {map, directions, entities} = parseInput(input);
    const finalEntities = runDirections(entities, directions);
    return getGpsCoordinates(finalEntities);
  },
  async Part2Answer(filename: string) {
    const input = await readTextFile(filename);
    return 0;
  },
};

type Point = {row: number; col: number};

type Box = Point & {
  type: 'box';
  id: number;
};

type Robot = Point & {
  type: 'robot';
};

type Wall = Point & {
  type: 'wall';
};

type Entity = Box | Wall | Robot;

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

function runDirections(initialEntities: Entity[], directions: Direction[]): Entity[] {
  let entities = [...initialEntities];
  directions.forEach((direction) => {
    entities = nextEntities(entities, direction);
  });
  return entities;
}

function nextEntities(currentEntities: Entity[], direction: Direction): Entity[] {
  const robot = currentEntities.find((e) => e.type === 'robot');
  if (!robot) {
    throw new Error('lost the robot');
  }

  const nextMove = determineMove(robot, direction, currentEntities);
  switch (nextMove.type) {
    case 'blocked':
      return currentEntities;
    case 'move':
      return currentEntities.map((e) => {
        if (e.type === 'robot') {
          return {type: 'robot', ...nextMove.to};
        }
        return e;
      });
    case 'push':
      return currentEntities.map((e) => {
        if (e.type === 'robot') {
          return {type: 'robot', ...nextMove.to};
        }
        if (e.type === 'box' && nextMove.boxes.some((b) => b.id === e.id)) {
          return {...e, ...getNextPoint(e, direction)};
        }
        return e;
      });
  }
}

function collision(a: Point, b: Point): boolean {
  return a.row === b.row && a.col === b.col;
}

type BlockedMove = {type: 'blocked'};
type SimpleMove = {type: 'move'; to: Point};
type PushMove = {type: 'push'; boxes: Box[]; to: Point};
type Move = BlockedMove | SimpleMove | PushMove;

export function determineMove(from: Point, direction: Direction, entities: Entity[]): Move {
  const nextPoint = getNextPoint(from, direction);
  const entityInWay = entities.find((e) => collision(nextPoint, e));

  if (!entityInWay) {
    return {type: 'move', to: nextPoint};
  }

  if (entityInWay.type === 'wall') {
    return {type: 'blocked'};
  }

  if (entityInWay.type === 'robot') {
    throw new Error('running into itself');
  }

  const pushResult = determineMoveBoxes(entityInWay, direction, entities);
  switch (pushResult.type) {
    case 'blocked':
      return {type: 'blocked'};
    case 'move':
      return {type: 'push', boxes: [entityInWay], to: nextPoint};
    case 'push':
      return {type: 'push', boxes: [entityInWay, ...pushResult.boxes], to: nextPoint};
  }
}

function determineMoveBoxes(box: Box, direction: Direction, entities: Entity[]): Move {
  return determineMove(box, direction, entities);
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
function getGpsCoordinates(entities: Entity[]): number {
  let total = 0;
  entities.forEach((e) => {
    if (e.type !== 'box') return;
    total += e.row * 100 + e.col;
  });
  return total;
}

// Parsing =====================================================================
function parseInput(input: string) {
  const parts = input.split('\n\n');
  const {map, entities} = parseMap(parts[0].split('\n'));
  return {map, entities, directions: parseDirections(parts[1])};
}

function parseMap(input: string[]) {
  let entities: Entity[] = [];
  let nextBoxId = 0;
  const map = input.map((row, i) =>
    row.split('').map((value, j) => {
      const item = value as Item;
      if (item === Item.Box) {
        entities.push({type: 'box', row: i, col: j, id: nextBoxId});
        nextBoxId++;
      }
      if (item === Item.Robot) {
        entities.push({type: 'robot', row: i, col: j});
      }
      if (item === Item.Wall) {
        entities.push({type: 'wall', row: i, col: j});
      }
      return item;
    }),
  );

  return {map, entities};
}

function parseDirections(input: string): Direction[] {
  return input.split('').filter((d) => Object.values(Direction).includes(d as any)) as Direction[];
}

// Debug =======================================================================
function printMap(map: Item[][]) {
  console.log(map.map((line) => line.join('')).join('\n'));
}
