import {alphabeticallyBy, readTextFile} from '../utils';

export const Day24 = {
  async Part1Answer(filename: string) {
    const input = await readTextFile(filename);
    const {wires, gates} = parseInput(input);
    return findAnswer(wires, gates);
  },
  async Part2Answer(filename: string) {
    const input = await readTextFile(filename);
    return 0;
  },
};

type GateType = 'AND' | 'OR' | 'XOR';

type Gate = {
  type: GateType;
  inputs: [string, string];
  output: string;
};

type Wires = Record<string, boolean>;

function findAnswer(initialWires: Wires, gates: Gate[]): number {
  let wires = initialWires;

  function checkGate(gate: Gate): boolean {
    const [a, b] = gate.inputs.map(checkWire);
    switch (gate.type) {
      case 'AND':
        return a && b;
      case 'OR':
        return a || b;
      case 'XOR':
        return a !== b;
    }
  }

  function checkWire(wire: string): boolean {
    if (wires[wire] !== undefined) {
      return wires[wire];
    }

    const gate = gates.find((g) => g.output === wire);
    if (!gate) {
      throw new Error('hey wha happened!?');
    }
    const value = checkGate(gate);
    wires[wire] = value;
    return value;
  }

  const zGates = gates.filter((g) => g.output.startsWith('z')).sort(alphabeticallyBy('output'));
  return getNumber(zGates.map(checkGate));
}

export function getNumber(wires: boolean[]): number {
  let total = 0;
  wires.forEach((wire, i) => {
    if (wire) {
      total += 2 ** i;
    }
  });
  return total;
}

// Parsing =====================================================================
function parseInput(input: string): {wires: Wires; gates: Gate[]} {
  const sections = input.split('\n\n');

  return {
    wires: Object.fromEntries(sections[0].split('\n').map(parseWire)),
    gates: sections[1].split('\n').map(parseGate),
  };
}

function parseWire(input: string): [string, boolean] {
  const parts = input.split(': ');
  return [parts[0], parts[1] === '1' ? true : false];
}

function parseGate(input: string): Gate {
  const parts = input.split(' ');
  return {
    type: parts[1] as GateType,
    inputs: [parts[0], parts[2]],
    output: parts[4],
  };
}

console.log(await Day24.Part1Answer('input.txt'));
