import {readLines} from '../utils';

export const Day16 = {
  async Part1Answer(filename: string) {
    const maze = await readLines(filename);
    const graph = buildGraph(maze);
    return findShortestDistance(graph);
  },
  async Part2Answer(filename: string) {
    const maze = await readLines(filename);
    return 0;
  },
};

export enum Direction {
  North = 'N',
  South = 'S',
  East = 'E',
  West = 'W',
}

type StateKey = string;

type Point = {row: number; col: number};

type State = Point & {
  direction: Direction;
  isStart?: boolean;
  isEnd?: boolean;
  transitions: Record<StateKey, number>;
};

export type Graph = Record<StateKey, State>;

function getKey(state: State): StateKey {
  return `${state.row}-${state.col}-${state.direction}`;
}

export function buildGraph(maze: string[]): Graph {
  let graph: Graph = {};
  const initialState: State = {
    ...getStartPoint(maze),
    direction: Direction.East,
    isStart: true,
    transitions: {},
  };
  let statesToExplore = [initialState];

  /**
   * Adds the state to the graph and returns if it's changed
   */
  function addState(state: State): boolean {
    const key = getKey(state);
    if (graph[key]) return false; // Already there

    graph[key] = state;
    if (getValue(state) === 'E') {
      graph[key].isEnd = true;
    }
    return true;
  }
  function addTransition(from: State, to: State, cost: number) {
    const fromKey = getKey(from);
    const toKey = getKey(to);
    graph[fromKey].transitions[toKey] = cost;
  }

  function getValue({row, col}: Point): string {
    return maze[row][col];
  }

  function nextValue(point: Point, direction: Direction): string {
    return getValue(getNextPoint(point, direction));
  }

  function canMove(point: Point, direction: Direction): boolean {
    return nextValue(point, direction) !== '#';
  }

  function findNextNode(point: Point, direction: Direction): {point: Point; cost: number} {
    // Check if we hit a wall
    if (!canMove(point, direction)) return {point, cost: 1};

    // Check if we hit a fork
    const availableTurns = getTurns(direction).filter((turn) => canMove(point, turn));
    if (availableTurns.length) {
      return {point, cost: 1};
    }

    const next = findNextNode(getNextPoint(point, direction), direction);
    return {point: next.point, cost: next.cost + 1};
  }

  function explore(state: State) {
    if (!addState(state)) return [];
    let nextStates: State[] = [];

    // Check for turns
    getTurns(state.direction).forEach((turn) => {
      if (canMove(state, turn)) {
        const nextState = {row: state.row, col: state.col, direction: turn, transitions: {}};
        addTransition(state, nextState, 1000);
        nextStates.push(nextState);
      }
    });

    // Check straight ahead
    if (canMove(state, state.direction)) {
      const nextNode = findNextNode(getNextPoint(state, state.direction), state.direction);
      const nextState = {...nextNode.point, direction: state.direction, transitions: {}};
      addTransition(state, nextState, nextNode.cost);
      nextStates.push(nextState);
    }

    return nextStates;
  }

  while (statesToExplore.length) {
    statesToExplore.push(...explore(statesToExplore[0]));
    statesToExplore.splice(0, 1);
  }

  return graph;
}

function getNextPoint(point: Point, direction: Direction): Point {
  switch (direction) {
    case Direction.North:
      return {row: point.row - 1, col: point.col};
    case Direction.South:
      return {row: point.row + 1, col: point.col};
    case Direction.West:
      return {row: point.row, col: point.col - 1};
    case Direction.East:
      return {row: point.row, col: point.col + 1};
  }
}

function getTurns(direction: Direction): Direction[] {
  switch (direction) {
    case Direction.North:
    case Direction.South:
      return [Direction.East, Direction.West];
    case Direction.East:
    case Direction.West:
      return [Direction.North, Direction.South];
  }
}

function getStartPoint(maze: string[]): Point {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[0].length; j++) {
      if (maze[i][j] === 'S') {
        return {row: i, col: j};
      }
    }
  }
  throw new Error('no start found');
}

// Shortest path ==============================================================
export function findShortestDistance(graph: Graph): number {
  const endState = Object.values(graph).find((s) => s.isEnd);
  const startState = Object.values(graph).find((s) => s.isStart);
  if (!endState || !startState) {
    throw new Error('Missing important state');
  }

  const endKey = getKey(endState);
  const startKey = getKey(startState);

  return dijkstra(graph, startKey, endKey);
}

// Getting a bit of help on the implementation side from ChatGPT on this one

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

function dijkstra(graph: Graph, start: StateKey, end: StateKey): number {
  const distances: Record<StateKey, number> = {};
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

// console.log(await Day16.Part1Answer('input.txt'));
