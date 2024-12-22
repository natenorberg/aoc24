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

function getPressesForDigit(from: string, to: string, pad: string[]): string {
  const fromPoint = pointOf(from, pad);
  const toPoint = pointOf(to, pad);
  const yDistance = toPoint.row - fromPoint.row;
  const xDistance = toPoint.col - fromPoint.col;
  let presses: string = '';
  if (xDistance > 0) {
    presses = presses + '>'.repeat(xDistance);
  }
  if (yDistance < 0) {
    presses = presses + '^'.repeat(yDistance * -1);
  }
  if (xDistance < 0) {
    presses = presses + '<'.repeat(xDistance * -1);
  }
  if (yDistance > 0) {
    presses = presses + 'v'.repeat(yDistance);
  }
  return presses;
}

type DirectionKey = '^' | 'A' | '<' | 'v' | '>';
function getPressesForDirectionKey(from: DirectionKey, to: DirectionKey): string {
  switch (from) {
    case '^':
      switch (to) {
        case '^':
          return '';
        case 'A':
          return '>';
        case '<':
          return 'v<';
        case 'v':
          return 'v';
        case '>':
          return 'v>';
      }
    case 'A':
      switch (to) {
        case '^':
          return '<';
        case 'A':
          return '';
        case '<':
          return 'v<<';
        case 'v':
          return '<v';
        case '>':
          return 'v';
      }
    case '<':
      switch (to) {
        case '^':
          return '>^';
        case 'A':
          return '>>^';
        case '<':
          return '';
        case 'v':
          return '>';
        case '>':
          return '>>';
      }
    case 'v':
      switch (to) {
        case '^':
          return '^';
        case 'A':
          return '>^';
        case '<':
          return '<';
        case 'v':
          return '';
        case '>':
          return '>';
      }
    case '>':
      switch (to) {
        case '^':
          return '<^';
        case 'A':
          return '^';
        case '<':
          return '<<';
        case 'v':
          return '<';
        case '>':
          return '';
      }
  }
}

function getPressesForCode(code: string, pad: string[]): string {
  let presses = '';
  let lastDigit = 'A';
  code.split('').forEach((digit) => {
    presses = presses + getPressesForDigit(lastDigit, digit, pad) + 'A';
    // total += padDistance(lastDigit, digit, pad);
    // total += 1; // Press A
    lastDigit = digit;
  });
  return presses;
}

export function getPressesForNumberPadCode(code: string): string {
  return getPressesForCode(code, numberPad);
}

export function getPressesForDirectionPadCode(code: string): string {
  let presses = '';
  let lastDigit = 'A';
  code.split('').forEach((digit) => {
    presses =
      presses + getPressesForDirectionKey(lastDigit as DirectionKey, digit as DirectionKey) + 'A';
    // total += padDistance(lastDigit, digit, pad);
    // total += 1; // Press A
    lastDigit = digit;
  });
  return presses;
}

function padLength(code: string, pad: string[]): number {
  let presses = '';
  let lastDigit = 'A';
  code.split('').forEach((digit) => {
    presses = presses + getPressesForDigit(lastDigit, digit, pad) + 'A';
    // total += padDistance(lastDigit, digit, pad);
    // total += 1; // Press A
    lastDigit = digit;
  });
  return presses.length;
}

export function numberPadLength(code: string): number {
  return padLength(code, numberPad);
}

export function directionPadLength(code: string): number {
  return padLength(code, directionPad);
}

function getComplexity(code: string): number {
  console.log(code);

  let presses = getPressesForNumberPadCode(code);
  presses = getPressesForDirectionPadCode(presses);
  presses = getPressesForDirectionPadCode(presses);

  console.log(`${presses.length} presses`);

  const codeNumber = Number.parseInt(code.slice(0, -1));
  return codeNumber * presses.length;
}
