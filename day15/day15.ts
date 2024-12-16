import {readTextFile} from '../utils';

export const Day15 = {
  async Part1Answer(filename: string) {
    const input = await readTextFile(filename);
    const {directions, entities} = parseInput(input, false);
    const finalEntities = runDirections(entities, directions);
    return getGpsCoordinates(finalEntities);
  },
  async Part2Answer(filename: string) {
    const input = await readTextFile(filename);
    const {directions, entities} = parseInput(input, true);
    const finalEntities = runDirections(entities, directions);
    return getGpsCoordinates(finalEntities);
  },
};

type Point = {row: number; col: number};

type RegularBox = Point & {
  type: 'box';
  id: number;
};

type WideBox = {
  type: 'wide-box';
  id: number;
  points: Point[];
};

type Box = RegularBox | WideBox;

type Robot = Point & {
  type: 'robot';
};

type Wall = Point & {
  type: 'wall';
};

type Entity = RegularBox | WideBox | Wall | Robot;

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
          return {type: 'robot', ...getNextPoint(robot, direction)};
        }
        return e;
      });
    case 'push':
      return currentEntities.map((e) => {
        if (e.type === 'robot') {
          return {type: 'robot', ...getNextPoint(robot, direction)};
        }
        if (e.type === 'box' && nextMove.boxes.some((b) => b.id === e.id)) {
          return {...e, ...getNextPoint(e, direction)};
        }
        if (e.type === 'wide-box' && nextMove.boxes.some((b) => b.id === e.id)) {
          return {...e, points: e.points.map((p) => getNextPoint(p, direction))};
        }
        return e;
      });
  }
}

function collision(a: Point, b: Entity | Point): boolean {
  if ('type' in b && b.type === 'wide-box') {
    return b.points.some((p) => collision(a, p));
  }
  return a.row === b.row && a.col === b.col;
}

type BlockedMove = {type: 'blocked'};
type SimpleMove = {type: 'move'};
type PushMove = {type: 'push'; boxes: Box[]};
type Move = BlockedMove | SimpleMove | PushMove;

function determineMove(from: Point, direction: Direction, entities: Entity[]): Move {
  const nextPoint = getNextPoint(from, direction);
  const entityInWay = entities.find((e) => collision(nextPoint, e));

  if (!entityInWay) {
    return {type: 'move'};
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
      return {type: 'push', boxes: [entityInWay]};
    case 'push':
      return {type: 'push', boxes: [entityInWay, ...pushResult.boxes]};
  }
}

function determineMoveBoxes(box: Box, direction: Direction, entities: Entity[]): Move {
  if (box.type === 'box') {
    return determineMove(box, direction, entities);
  }

  const relevantPoints = (() => {
    switch (direction) {
      case Direction.Up:
      case Direction.Down:
        return box.points;
      case Direction.Left:
        return [box.points[0]];
      case Direction.Right:
        return [box.points[1]];
    }
  })();

  const nextMoves = relevantPoints.map((p) => determineMove(p, direction, entities));
  if (nextMoves.some((m) => m.type === 'blocked')) {
    return {type: 'blocked'};
  }
  const pushMoves = nextMoves.filter((m) => m.type === 'push');
  let pushingBoxes: Box[] = [];
  pushMoves.forEach((move) =>
    move.boxes.forEach((box) => {
      if (!pushingBoxes.find((b) => b.id === box.id)) {
        pushingBoxes.push(box);
      }
    }),
  );

  if (!pushingBoxes.length) {
    return {type: 'move'};
  }

  return {type: 'push', boxes: pushingBoxes};
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
    if (e.type === 'box') {
      total += e.row * 100 + e.col;
    } else if (e.type === 'wide-box') {
      total += e.points[0].row * 100 + e.points[0].col;
    }
  });
  return total;
}

// Parsing =====================================================================
function parseInput(input: string, wide: boolean) {
  const parts = input.split('\n\n');
  const entityLines = parts[0].split('\n');
  const entities = wide ? parseWideEntities(entityLines) : parseNormalEntities(entityLines);
  return {entities, directions: parseDirections(parts[1])};
}

function parseNormalEntities(input: string[]) {
  let entities: Entity[] = [];
  let nextBoxId = 0;
  input.forEach((row, i) =>
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
    }),
  );

  return entities;
}

function parseWideEntities(input: string[]) {
  let entities: Entity[] = [];
  let nextBoxId = 0;
  input.forEach((row, i) =>
    row.split('').map((value, j) => {
      const item = value as Item;
      if (item === Item.Box) {
        entities.push({
          type: 'wide-box',
          points: [
            {row: i, col: j * 2},
            {row: i, col: j * 2 + 1},
          ],
          id: nextBoxId,
        });
        nextBoxId++;
      }
      if (item === Item.Robot) {
        entities.push({type: 'robot', row: i, col: j * 2});
      }
      if (item === Item.Wall) {
        entities.push({type: 'wall', row: i, col: j * 2});
        entities.push({type: 'wall', row: i, col: j * 2 + 1});
      }
    }),
  );

  return entities;
}

function parseDirections(input: string): Direction[] {
  return input.split('').filter((d) => Object.values(Direction).includes(d as any)) as Direction[];
}

// Debug =======================================================================
function printMap(entities: Entity[]) {
  const {width, height} = getDimensions(entities);

  let map = Array.from({length: height}, () => Array.from({length: width}, () => '.'));
  entities.forEach((e) => {
    switch (e.type) {
      case 'wall':
        map[e.row][e.col] = '#';
        break;
      case 'robot':
        map[e.row][e.col] = '@';
        break;
      case 'box':
        map[e.row][e.col] = 'O';
        break;
      case 'wide-box':
        map[e.points[0].row][e.points[0].col] = '[';
        map[e.points[1].row][e.points[1].col] = ']';
    }
  });

  console.log(map.map((line) => line.join('')).join('\n'));
}

function getDimensions(entities: Entity[]) {
  let maxCol = 0;
  let maxRow = 0;

  entities.forEach((e) => {
    const row = e.type === 'wide-box' ? e.points[1].row : e.row;
    const col = e.type === 'wide-box' ? e.points[1].col : e.col;
    if (row > maxRow) {
      maxRow = row;
    }
    if (col > maxCol) {
      maxCol = col;
    }
  });

  return {height: maxRow + 1, width: maxCol + 1};
}

// console.log(await Day15_Alt.Part2Answer('input.txt'));
