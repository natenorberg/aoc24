import {readTextFile} from '../utils';

export const Day17 = {
  async Part1Answer(filename: string) {
    const input = await readTextFile(filename);
    const machine = parseMachine(input);
    const {output} = runMachine(machine);
    return output.join(',');
  },
  async Part2Answer(filename: string) {
    return 0;
  },
};

type State = {
  registers: Registers;
  nextInstruction: number;
};

type Registers = {
  A: number;
  B: number;
  C: number;
};

export enum Op {
  adv,
  bxl,
  bst,
  jnz,
  bxc,
  out,
  bdv,
  cdv,
}

type Machine = {state: State; instructions: Op[]};

export function runMachine({state: initialState, instructions}: Machine): {
  output: number[];
  finalState: State;
} {
  let state = initialState;
  let allOutput: number[] = [];

  while (instructions[state.nextInstruction] !== undefined) {
    const instruction = instructions[state.nextInstruction];
    const operand = instructions[state.nextInstruction + 1];

    const {nextState, output} = runInstruction(instruction, operand, state);
    if (output !== undefined) {
      allOutput.push(output);
    }
    state = nextState;
  }

  return {output: allOutput, finalState: state};
}

export function runInstruction(
  instruction: Op,
  operand: number,
  state: State,
): {nextState: State; output?: number} {
  let nextState = {...state};
  let output: number | undefined;

  function combo(operand: number): number {
    switch (operand) {
      case 0:
      case 1:
      case 2:
      case 3:
        return operand;
      case 4:
        return state.registers.A;
      case 5:
        return state.registers.B;
      case 6:
        return state.registers.C;
      default:
        throw new Error('invalid operand');
    }
  }

  // Most instructions will set the nextState to the new state, which will get
  // an incremented instruction at the end. For exceptions, return early
  switch (instruction) {
    case Op.adv:
      const aValue = Math.trunc(state.registers.A / 2 ** combo(operand));
      nextState = updateRegister(state, 'A', aValue);
      break;
    case Op.bxl:
      // used in test
      // Bitwise XOR
      nextState = updateRegister(state, 'B', state.registers.B ^ operand);
      break;
    case Op.bst:
      nextState = updateRegister(state, 'B', combo(operand) % 8);
      break;
    case Op.jnz:
      // used in test
      if (state.registers.A !== 0) {
        return {nextState: {...state, nextInstruction: operand}}; // early return. no increment
      }
      break;
    case Op.bxc:
      nextState = updateRegister(state, 'B', state.registers.B ^ state.registers.C);
      break;
    case Op.out:
      //used in test
      output = combo(operand) % 8;
      break;
    case Op.bdv:
      const bValue = Math.trunc(state.registers.A / 2 ** combo(operand));
      nextState = updateRegister(state, 'B', bValue);
      break;
    case Op.cdv:
      const cValue = Math.trunc(state.registers.A / 2 ** combo(operand));
      nextState = updateRegister(state, 'C', cValue);
      break;
  }

  // Increment the next instruction
  return {nextState: {...nextState, nextInstruction: nextState.nextInstruction + 2}, output};
}

function updateRegister(state: State, register: keyof State['registers'], value: number): State {
  return {
    ...state,
    registers: {...state.registers, [register]: value},
  };
}

// Parsing =====================================================================

export function parseMachine(input: string): Machine {
  const parts = input.split('\n\n');
  const registers = parts[0].split('\n').map(parseRegister);
  const [_, instructionString] = parts[1].split(': ');
  const instructions = instructionString.split(',').map((n) => Number.parseInt(n) as Op);

  return {
    state: {
      registers: {A: registers[0], B: registers[1], C: registers[2]},
      nextInstruction: 0,
    },
    instructions,
  };
}

function parseRegister(input: string): number {
  const parts = input.split(': ');
  return Number.parseInt(parts[1]);
}

// console.log(await Day17.Part1Answer('input.txt'));
