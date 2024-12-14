import {readLines} from '../utils';
import {isChristmasTree} from './spoilers';

export const Day14 = {
  async Part1Answer(filename: string, dimensions: Dimensions) {
    const lines = await readLines(filename);
    const robots = lines.map(parseRobot);

    const {endingPositions} = simulateRobots(robots, dimensions, seconds(100));
    return checkQuadrants(endingPositions, dimensions);
  },
  async Part2Answer(filename: string, dimensions: Dimensions) {
    const lines = await readLines(filename);
    const robots = lines.map(parseRobot);

    const {endingPositions, secondsElapsed} = simulateRobots(robots, dimensions, (p, i) =>
      isChristmasTree(p, i, dimensions),
    );

    // 🎄 Print the Christmas tree for fun 🎄
    printArea(endingPositions, dimensions);

    return secondsElapsed;
  },
};

export type Dimensions = {width: number; height: number};

export type Coordinates = {x: number; y: number};

export type RobotDefinition = {
  start: Coordinates;
  velocity: Coordinates;
};

type EndingCondition = (positions: Coordinates[], i: number) => boolean;
export const seconds =
  (s: number): EndingCondition =>
  (_, i) =>
    i >= s;

export function simulateRobots(
  robotDefs: RobotDefinition[],
  dimensions: Dimensions,
  endingCondition: EndingCondition,
): {endingPositions: Coordinates[]; secondsElapsed: number} {
  let positions: Coordinates[] = robotDefs.map((r) => r.start);
  let i = 0; // Moving this outside the for loop so that it can be returned for the part 2 answer

  for (; !endingCondition(positions, i); i++) {
    positions = positions.map((r, i) => {
      const velocity = robotDefs[i].velocity;
      return {
        x: (dimensions.width + (r.x + velocity.x)) % dimensions.width,
        y: (dimensions.height + (r.y + velocity.y)) % dimensions.height,
      };
    });
  }

  return {endingPositions: positions, secondsElapsed: i};
}

function printArea(positions: Coordinates[], dimensions: Dimensions) {
  const map = Array.from({length: dimensions.height}, (_row, i) =>
    Array.from({length: dimensions.width}, (_, j) =>
      positions.some(({x, y}) => x === j && y === i) ? '*' : '.',
    ).join(''),
  ).join('\n');
  console.log(map);
}

// Scoring =====================================================================
enum Quadrant {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
  None,
}

function checkQuadrants(positions: Coordinates[], dimensions: Dimensions): number {
  let topLeft = 0;
  let topRight = 0;
  let bottomLeft = 0;
  let bottomRight = 0;
  const middleX = (dimensions.width + 1) / 2 - 1;
  const middleY = (dimensions.height + 1) / 2 - 1;

  function getQuadrant(position: Coordinates): Quadrant {
    if (position.x === middleX || position.y === middleY) {
      return Quadrant.None;
    }

    if (position.x < middleX) {
      return position.y < middleY ? Quadrant.TopLeft : Quadrant.BottomLeft;
    } else {
      return position.y < middleY ? Quadrant.TopRight : Quadrant.BottomRight;
    }
  }

  positions.forEach((p) => {
    const quadrant = getQuadrant(p);
    switch (quadrant) {
      case Quadrant.TopLeft:
        return topLeft++;
      case Quadrant.TopRight:
        return topRight++;
      case Quadrant.BottomLeft:
        return bottomLeft++;
      case Quadrant.BottomRight:
        return bottomRight++;
      case Quadrant.None:
    }
  });

  return topLeft * topRight * bottomLeft * bottomRight;
}

// Parsing =====================================================================
function parseRobot(input: string): RobotDefinition {
  const parts = input.split(' ');
  const start = parts[0]
    .replace('p=', '')
    .split(',')
    .map((n) => Number.parseInt(n));
  const velocity = parts[1]
    .replace('v=', '')
    .split(',')
    .map((n) => Number.parseInt(n));

  return {
    start: {x: start[0], y: start[1]},
    velocity: {x: velocity[0], y: velocity[1]},
  };
}

const testDimensions = {width: 11, height: 7};
const realDimensions = {width: 101, height: 103};
// console.log(await Day14.Part2Answer('input.txt', realDimensions));
