import {dijkstra} from '../dijkstra';
import {readLines} from '../utils';

export const Day18 = {
  async Part1Answer(filename: string, dimensions: Dimensions, numBytes: number) {
    const lines = await readLines(filename);
    const points = parsePoints(lines);
    const fallenPoints = points.slice(0, numBytes);
    const walkableSpaces = getWalkableSpaces(dimensions, fallenPoints);
    const graph = buildGraph(dimensions, walkableSpaces);
    return dijkstra(graph, '0-0', `${dimensions.width - 1}-${dimensions.height - 1}`);
  },
  async Part2Answer(filename: string) {
    const lines = await readLines(filename);
    return 0;
  },
};

export type Dimensions = {width: number; height: number};

type Point = {row: number; col: number};

type NodeKey = string;

type Node = Point & {
  isStart?: boolean;
  isEnd?: boolean;
  transitions: Record<NodeKey, number>;
};

export type Graph = Record<NodeKey, Node>;

function getKeyFromNode(node: Node): NodeKey {
  return getKey(node.col, node.row);
}
function getKey(x: number, y: number): NodeKey {
  return `${x}-${y}`;
}

function buildGraph(dimensions: Dimensions, walkableSpaces: boolean[][]): Graph {
  let graph: Graph = {};
  for (let i = 0; i < dimensions.height; i++) {
    for (let j = 0; j < dimensions.width; j++) {
      if (!walkableSpaces[i][j]) continue;
      const isStart = i === 0 && j === 0;
      const isEnd = i === dimensions.height - 1 && j === dimensions.width - 1;
      let node: Node = {col: j, row: i, isStart, isEnd, transitions: {}};

      if (walkableSpaces[i - 1]?.[j]) {
        node.transitions[getKey(j, i - 1)] = 1;
      }
      if (walkableSpaces[i + 1]?.[j]) {
        node.transitions[getKey(j, i + 1)] = 1;
      }
      if (walkableSpaces[i][j - 1]) {
        node.transitions[getKey(j - 1, i)] = 1;
      }
      if (walkableSpaces[i][j + 1]) {
        node.transitions[getKey(j + 1, i)] = 1;
      }
      graph[getKeyFromNode(node)] = node;
    }
  }
  return graph;
}

function getWalkableSpaces(dimensions: Dimensions, corruptedPoints: Point[]): boolean[][] {
  return Array.from({length: dimensions.height}, (_row, y) =>
    Array.from(
      {length: dimensions.width},
      (_, x) => !corruptedPoints.some((p) => p.col === x && p.row === y),
    ),
  );
}

// Parsing =====================================================================
function parsePoints(input: string[]): Point[] {
  return input.map((line) => {
    const parts = line.split(',').map((n) => Number.parseInt(n));
    return {col: parts[0], row: parts[1]};
  });
}

console.log(await Day18.Part1Answer('input.txt', {width: 71, height: 71}, 1024));
