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

type Point = {x: number; y: number};

type NodeKey = string;

type Node = Point & {
  isStart?: boolean;
  isEnd?: boolean;
  transitions: Record<NodeKey, number>;
};

export type Graph = Record<NodeKey, Node>;

function getKeyFromNode(node: Node): NodeKey {
  return getKey(node.x, node.y);
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
      let node: Node = {x: j, y: i, isStart, isEnd, transitions: {}};

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

class PriorityQueue<T> {
  private heap: {value: T; priority: number}[] = [];

  enqueue(value: T, priority: number) {
    this.heap.push({value, priority});
    this.heap.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.heap.shift()?.value;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function dijkstra(graph: Graph, start: NodeKey, end: NodeKey): number {
  const distances: Record<NodeKey, number> = {};
  const priorityQueue = new PriorityQueue<string>();
  const visited = new Set<string>();

  Object.keys(graph).forEach((key) => (distances[key] = Infinity));
  distances[start] = 0;

  priorityQueue.enqueue(start, 0);

  while (!priorityQueue.isEmpty()) {
    const currentNode = priorityQueue.dequeue()!;
    if (visited.has(currentNode)) continue;
    visited.add(currentNode);

    if (currentNode === end) return distances[end]; // Found path

    Object.entries(graph[currentNode].transitions).forEach(([neighbor, cost]) => {
      const newDistance = distances[currentNode] + cost;

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        priorityQueue.enqueue(neighbor, newDistance);
      }
    });
  }
  return Infinity;
}

function getWalkableSpaces(dimensions: Dimensions, corruptedPoints: Point[]): boolean[][] {
  return Array.from({length: dimensions.height}, (_row, y) =>
    Array.from(
      {length: dimensions.width},
      (_, x) => !corruptedPoints.some((p) => p.x === x && p.y === y),
    ),
  );
}

// Parsing =====================================================================
function parsePoints(input: string[]): Point[] {
  return input.map((line) => {
    const parts = line.split(',').map((n) => Number.parseInt(n));
    return {x: parts[0], y: parts[1]};
  });
}

console.log(await Day18.Part1Answer('input.txt', {width: 71, height: 71}, 1024));
