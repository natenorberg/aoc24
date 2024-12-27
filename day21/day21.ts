import {PriorityQueue} from '../dijkstra';
import {readLines, sumByFunc} from '../utils';

export const Day21 = {
  async Part1Answer(filename: string) {
    const codes = await readLines(filename);
    return sumByFunc(codes, getComplexity);
  },
  async Part2Answer(filename: string) {
    const lines = await readLines(filename);
    return 0;
  },
};

type Point = {row: number; col: number};
type DirectionKey = '^' | 'A' | '<' | 'v' | '>';
const directionKeys = ['A', '^', '<', 'v', '>'] as const;

type NumberPadState = {
  codeEntered: string;
  numberPadArm: Point;
};

type State = {
  codeEntered: string;
  numberPadArm: Point;
  dPad2Arm: Point;
  dPad1Arm: Point;
};

// type SimpleNode = SimpleState & {
//   transitions: Record<string, DirectionKey>;
// };

type Node = State & {
  transitions: Record<string, DirectionKey>;
};

type Graph = Record<string, Node>;

// function getSimpleNodeKey(node: SimpleNode) {
//   return `${node.codeEntered}:${getCoordinates(node.numberPadArm)}`;
// }

function getNodeKey(node: Node) {
  return [
    node.codeEntered,
    getCoordinates(node.numberPadArm),
    getCoordinates(node.dPad2Arm),
    getCoordinates(node.dPad1Arm),
  ].join(':');
}

function getCoordinates(point: Point) {
  return `${point.row},${point.col}`;
}

const numberPad = ['789', '456', '123', '.0A'];
const directionPad = ['.^A', '<v>'];

// console.log(await Day21.Part1Answer('input.txt'));

export function getShortestPath(code: string): string {
  let graph: Graph = {};
  const startNode: Node = {
    codeEntered: '',
    numberPadArm: {row: 3, col: 2},
    dPad2Arm: {row: 0, col: 2},
    dPad1Arm: {row: 0, col: 2},
    transitions: {},
  };
  const startKey = getNodeKey(startNode);
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
    const {newNodes, transitions} = getTransitions(currentNode, code);
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

function getTransitions(node: Node, targetCode: string) {
  const currentNodeKey = getNodeKey(node);
  let newNodes: Record<string, Node> = {};
  let transitions: Record<string, DirectionKey> = {};

  directionKeys.forEach((key) => {
    const nextNode = {...nextState(node, key, targetCode), transitions: {}};
    const nextNodeKey = getNodeKey(nextNode);
    if (nextNodeKey === currentNodeKey) return; // Nothing changed

    newNodes[nextNodeKey] = nextNode;
    transitions[nextNodeKey] = key;
  });

  return {newNodes, transitions};
}

function getNextNumberPadState(
  prevState: NumberPadState,
  key: DirectionKey,
  targetCode: string,
): NumberPadState {
  switch (key) {
    case 'A':
      const currentButton = numberPad[prevState.numberPadArm.row][prevState.numberPadArm.col];
      const nextCode = prevState.codeEntered + currentButton;
      if (!targetCode.startsWith(nextCode)) return prevState;
      return {...prevState, codeEntered: prevState.codeEntered + currentButton};

    case '^':
      if (prevState.numberPadArm.row === 0) return prevState;
      var nextButton = numberPad[prevState.numberPadArm.row - 1][prevState.numberPadArm.col];
      if (nextButton === '.') return prevState;
      return {
        ...prevState,
        numberPadArm: {...prevState.numberPadArm, row: prevState.numberPadArm.row - 1},
      };
    case '<':
      if (prevState.numberPadArm.col === 0) return prevState;
      var nextButton = numberPad[prevState.numberPadArm.row][prevState.numberPadArm.col - 1];
      if (nextButton === '.') return prevState;
      return {
        ...prevState,
        numberPadArm: {...prevState.numberPadArm, col: prevState.numberPadArm.col - 1},
      };
    case 'v':
      if (prevState.numberPadArm.row === 3) return prevState;
      var nextButton = numberPad[prevState.numberPadArm.row + 1][prevState.numberPadArm.col];
      if (nextButton === '.') return prevState;
      return {
        ...prevState,
        numberPadArm: {...prevState.numberPadArm, row: prevState.numberPadArm.row + 1},
      };
    case '>':
      if (prevState.numberPadArm.col === 2) return prevState;
      var nextButton = numberPad[prevState.numberPadArm.row][prevState.numberPadArm.col + 1];
      if (nextButton === '.') return prevState;
      return {
        ...prevState,
        numberPadArm: {...prevState.numberPadArm, col: prevState.numberPadArm.col + 1},
      };
  }
}

function getNextDPadState(
  prevState: Point,
  key: DirectionKey,
): {state: Point; keyPressed?: DirectionKey} {
  switch (key) {
    case 'A':
      const currentButton = directionPad[prevState.row][prevState.col];
      return {state: prevState, keyPressed: currentButton as DirectionKey};
    case '^':
      if (prevState.row === 0) return {state: prevState};
      var nextButton = directionPad[prevState.row - 1][prevState.col];
      if (nextButton === '.') return {state: prevState};
      return {state: {...prevState, row: prevState.row - 1}};
    case '<':
      if (prevState.col === 0) return {state: prevState};
      var nextButton = directionPad[prevState.row][prevState.col - 1];
      if (nextButton === '.') return {state: prevState};
      return {state: {...prevState, col: prevState.col - 1}};
    case 'v':
      if (prevState.row === 1) return {state: prevState};
      var nextButton = directionPad[prevState.row + 1][prevState.col];
      if (nextButton === '.') return {state: prevState};
      return {state: {...prevState, row: prevState.row + 1}};
    case '>':
      if (prevState.col === 2) return {state: prevState};
      var nextButton = directionPad[prevState.row][prevState.col + 1];
      if (nextButton === '.') return {state: prevState};
      return {state: {...prevState, col: prevState.col + 1}};
  }
}

function nextState(prev: State, key: DirectionKey, targetCode: string): State {
  const {state: nextDPad1Arm, keyPressed: dPad1KeyPressed} = getNextDPadState(prev.dPad1Arm, key);
  if (!dPad1KeyPressed) {
    return {...prev, dPad1Arm: nextDPad1Arm};
  }

  const {state: nextDPad2Arm, keyPressed: dPad2KeyPressed} = getNextDPadState(
    prev.dPad2Arm,
    dPad1KeyPressed,
  );
  if (!dPad2KeyPressed) {
    return {...prev, dPad1Arm: nextDPad1Arm, dPad2Arm: nextDPad2Arm};
  }

  const numberPadState = getNextNumberPadState(prev, dPad2KeyPressed, targetCode);
  return {...prev, ...numberPadState, dPad2Arm: nextDPad2Arm, dPad1Arm: nextDPad1Arm};
}

function getComplexity(code: string): number {
  const numberComponent = Number.parseInt(code.split('A')[0]);
  const shortestPath = getShortestPath(code);
  return numberComponent * shortestPath.length;
}

// function getTransitions_simple(node: SimpleNode, targetCode: string) {
//   let newNodes: Record<string, SimpleNode> = {};
//   let transitions: Record<string, DirectionKey> = {};
//   const currentButton = numberPad[node.numberPadArm.row][node.numberPadArm.col];

//   // Check A
//   const a: SimpleNode = {...node, codeEntered: node.codeEntered + currentButton};
//   if (targetCode.startsWith(a.codeEntered)) {
//     newNodes[getSimpleNodeKey(a)] = a;
//     transitions[getSimpleNodeKey(a)] = 'A';
//   }

//   // Check ^
//   if (node.numberPadArm.row > 0) {
//     const up: SimpleNode = {
//       ...node,
//       numberPadArm: {...node.numberPadArm, row: node.numberPadArm.row - 1},
//     };
//     newNodes[getSimpleNodeKey(up)] = up;
//     transitions[getSimpleNodeKey(up)] = '^';
//   }

//   // Check <
//   if (node.numberPadArm.col > 0) {
//     const left: SimpleNode = {
//       ...node,
//       numberPadArm: {...node.numberPadArm, col: node.numberPadArm.col - 1},
//     };
//     newNodes[getSimpleNodeKey(left)] = left;
//     transitions[getSimpleNodeKey(left)] = '<';
//   }

//   // Check v
//   if (node.numberPadArm.row < 3) {
//     const down: SimpleNode = {
//       ...node,
//       numberPadArm: {...node.numberPadArm, row: node.numberPadArm.row + 1},
//     };
//     newNodes[getSimpleNodeKey(down)] = down;
//     transitions[getSimpleNodeKey(down)] = 'v';
//   }

//   // Check >
//   if (node.numberPadArm.col < 2) {
//     const right: SimpleNode = {
//       ...node,
//       numberPadArm: {...node.numberPadArm, col: node.numberPadArm.col + 1},
//     };
//     newNodes[getSimpleNodeKey(right)] = right;
//     transitions[getSimpleNodeKey(right)] = '>';
//   }
//
//   return {newNodes, transitions};
// }

console.log(await Day21.Part1Answer('input.txt'));
