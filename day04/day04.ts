import {readLines, sumByFunc} from '../utils';

export const Day04 = {
  async Part1Answer(filename: string) {
    const input = await readLines(filename);
    return findAllMatches(input);
  },
  async Part2Answer(filename: string) {
    const input = await readLines(filename);
    return getXMasCount(input);
  },
};

function findAllMatches(lines: string[]) {
  const horizontal = lines;
  const horizontalBack = reverseStrings(lines);
  const vertical = getVerticalLines(lines);
  const verticalBack = reverseStrings(vertical);
  const diagonalDown = getDiagonalDownLines(lines);
  const diagonalDownBack = reverseStrings(diagonalDown);
  const diagonalUp = getDiagonalUpLines(lines);
  const diagonalUpBack = reverseStrings(diagonalUp);
  const all = [
    horizontal,
    horizontalBack,
    vertical,
    verticalBack,
    diagonalDown,
    diagonalDownBack,
    diagonalUp,
    diagonalUpBack,
  ];

  let total = 0;

  all.forEach((lines) => {
    const matches = findMatches(lines);
    total += matches;
  });

  return total;
}

function getVerticalLines(input: string[]) {
  let lines: string[] = [];
  for (let i = 0; i < input[0].length; i++) {
    const line = input.map((c) => c[i]).join('');
    lines = [...lines, line];
  }
  return lines;
}

function getDiagonalDownLines(input: string[]): string[] {
  let lines: string[] = [];

  for (let i = 0 - input.length + 1; i < input[0].length; i++) {
    let nextLine: string[] = [];
    for (let j = 0; j < input.length; j++) {
      if (isInBounds(j, i + j, input)) {
        nextLine.push(input[j][i + j]);
      }
    }
    lines.push(nextLine.join(''));
  }
  return lines;
}

function getDiagonalUpLines(input: string[]): string[] {
  let lines: string[] = [];

  for (let i = 0 - input.length + 1; i < input[0].length; i++) {
    let nextLine: string[] = [];
    for (let j = input.length - 1; j >= 0; j--) {
      const row = j;
      const col = i + (input.length - j);

      if (isInBounds(row, col, input)) {
        nextLine.push(input[row][col]);
      }
    }
    lines.push(nextLine.join(''));
  }
  return lines;
}

function isInBounds(row: number, col: number, area: string[]): boolean {
  if (row < 0) return false;
  if (col < 0) return false;
  if (row >= area.length) return false;
  if (col >= area[0].length) return false;
  return true;
}

function findMatches(input: string[]) {
  return sumByFunc(input, findMatchesForLine);
}

function findMatchesForLine(input: string) {
  return Array.from(input.matchAll(/XMAS/g)).length;
}

function reverseStrings(input: string[]) {
  return input.map((s) => s.split('').reverse().join(''));
}

function getXMasCount(puzzle: string[]): number {
  let count = 0;
  for (let i = 0; i < puzzle.length - 2; i++) {
    for (let j = 0; j < puzzle[0].length - 2; j++) {
      if (isXMas(i, j, puzzle)) {
        count++;
      }
    }
  }

  return count;
}

/**
 * Checks if there's an X-MAS at the spot
 * @param row The row of the top left corner
 * @param col The column of the top left corner
 * @param puzzle The entire puzzle
 */
function isXMas(row: number, col: number, puzzle: string[]): boolean {
  // Make sure the A is there
  if (puzzle[row + 1][col + 1] !== 'A') return false;

  // Make sure the downward diagonal is a "MAS"
  if (puzzle[row][col] === 'M') {
    if (puzzle[row + 2][col + 2] !== 'S') return false;
  } else if (puzzle[row][col] === 'S') {
    if (puzzle[row + 2][col + 2] !== 'M') return false;
  } else {
    return false;
  }

  // Check the other diagonal
  const otherDiagonal = [puzzle[row][col + 2], puzzle[row + 2][col]];
  return otherDiagonal.includes('M') && otherDiagonal.includes('S');
}

console.log(await Day04.Part2Answer('input.txt'));
