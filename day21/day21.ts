import {PriorityQueue} from '../dijkstra';
import {readLines, sumByFunc} from '../utils';

export const Day21 = {
  async Part1Answer(filename: string) {
    const codes = await readLines(filename);
    return 0;
  },
  async Part2Answer(filename: string) {
    const lines = await readLines(filename);
    return 0;
  },
};

type Point = {row: number; col: number};
type DirectionKey = '^' | 'A' | '<' | 'v' | '>';

type SimpleState = {
  codeEntered: string;
  numberPadArm: Point;
};

type SimpleNode = SimpleState & {
  transitions: Record<string, DirectionKey>;
};

type Graph = Record<string, SimpleNode>;

function getSimpleNodeKey(node: SimpleNode) {
  return `${node.codeEntered}:${getCoordinates(node.numberPadArm)}`;
}

function getCoordinates(point: Point) {
  return `${point.row},${point.col}`;
}

const numberPad = ['789', '456', '123', '.0A'];
const directionPad = ['.^A', '<v>'];

function pointOf(value: string, pad: string[]): Point {
  for (let i = 0; i < pad.length; i++) {
    for (let j = 0; j < pad[0].length; j++) {
      if (pad[i][j] === value) {
        return {row: i, col: j};
      }
    }
  }
  throw new Error(`can't find ${value}`);
}

// console.log(await Day21.Part1Answer('input.txt'));

export function getShortestPath(code: string): string {
  let graph: Graph = {};
  const startNode: SimpleNode = {
    codeEntered: '',
    numberPadArm: {row: 3, col: 2},
    transitions: {},
  };
  const startKey = getSimpleNodeKey(startNode);
  graph[startKey] = startNode;

  const paths: Record<string, string> = {};
  const priorityQueue = new PriorityQueue<string>();
  const visited = new Set<string>();

  paths[startKey] = '';
  priorityQueue.enqueue(startKey, 0);

  while (!priorityQueue.isEmpty()) {
    const currentNodeKey = priorityQueue.dequeue()!;
    if (visited.has(currentNodeKey)) continue;
    visited.add(currentNodeKey);

    if (isNodeEnd(currentNodeKey, code)) return paths[currentNodeKey]!; // Found path

    const currentNode = graph[currentNodeKey];
    if (!currentNode) {
      throw new Error("can't find node");
    }
    // Build out possible transitions
    const {newNodes, transitions} = getTransitions_simple(currentNode, code);
    graph = {...graph, ...newNodes};
    currentNode.transitions = transitions;

    Object.entries(graph[currentNodeKey].transitions).forEach(([neighbor, direction]) => {
      const newPath = (paths[currentNodeKey] ?? '') + direction;

      if (paths[neighbor] === undefined || newPath.length < paths[neighbor].length) {
        paths[neighbor] = newPath;
        priorityQueue.enqueue(neighbor, newPath.length);
      }
    });
  }
  throw new Error("couldn't find the path");
}

function isNodeEnd(nodeKey: string, code: string) {
  return nodeKey.split(':')[0] === code;
}

function getTransitions_simple(node: SimpleNode, targetCode: string) {
  let newNodes: Record<string, SimpleNode> = {};
  let transitions: Record<string, DirectionKey> = {};
  const currentButton = numberPad[node.numberPadArm.row][node.numberPadArm.col];

  // Check A
  const a: SimpleNode = {...node, codeEntered: node.codeEntered + currentButton};
  if (targetCode.startsWith(a.codeEntered)) {
    newNodes[getSimpleNodeKey(a)] = a;
    transitions[getSimpleNodeKey(a)] = 'A';
  }

  // Check ^
  if (node.numberPadArm.row > 0) {
    const up: SimpleNode = {
      ...node,
      numberPadArm: {...node.numberPadArm, row: node.numberPadArm.row - 1},
    };
    newNodes[getSimpleNodeKey(up)] = up;
    transitions[getSimpleNodeKey(up)] = '^';
  }

  // Check <
  if (node.numberPadArm.col > 0) {
    const left: SimpleNode = {
      ...node,
      numberPadArm: {...node.numberPadArm, col: node.numberPadArm.col - 1},
    };
    newNodes[getSimpleNodeKey(left)] = left;
    transitions[getSimpleNodeKey(left)] = '<';
  }

  // Check v
  if (node.numberPadArm.row < 3) {
    const down: SimpleNode = {
      ...node,
      numberPadArm: {...node.numberPadArm, row: node.numberPadArm.row + 1},
    };
    newNodes[getSimpleNodeKey(down)] = down;
    transitions[getSimpleNodeKey(down)] = 'v';
  }

  // Check >
  if (node.numberPadArm.col < 2) {
    const right: SimpleNode = {
      ...node,
      numberPadArm: {...node.numberPadArm, col: node.numberPadArm.col + 1},
    };
    newNodes[getSimpleNodeKey(right)] = right;
    transitions[getSimpleNodeKey(right)] = '>';
  }

  return {newNodes, transitions};
}
