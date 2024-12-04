import {readLines} from '../utils';

/**
 * An alternate solution for day 4 after I thought of a simpler way to do it
 * Loop through each starting point with a list of "matchers"
 */
export const Day04_Alt = {
  async Part1Answer(filename: string) {
    const puzzle = await readLines(filename);
    return getMatches(puzzle, [
      matchLeft,
      matchRight,
      matchUp,
      matchDown,
      matchUpLeft,
      matchUpRight,
      matchDownLeft,
      matchDownRight,
    ]);
  },
  async Part2Answer(filename: string) {
    const puzzle = await readLines(filename);
    return getMatches(puzzle, [matchXMas]);
  },
};

type Matcher = (row: number, col: number, puzzle: string[]) => boolean;

function getMatches(puzzle: string[], matchers: Matcher[]): number {
  let matches = 0;

  puzzle.forEach((line, i) => {
    line.split('').forEach((_char, j) => {
      matchers.forEach((isMatch) => {
        if (isMatch(i, j, puzzle)) {
          matches++;
        }
      });
    });
  });

  return matches;
}

// Matchers ====================================================================

function matchLeft(row: number, col: number, puzzle: string[]): boolean {
  return (
    puzzle[row][col] === 'X' &&
    puzzle[row][col - 1] === 'M' &&
    puzzle[row][col - 2] === 'A' &&
    puzzle[row][col - 3] === 'S'
  );
}

function matchRight(row: number, col: number, puzzle: string[]): boolean {
  return (
    puzzle[row][col] === 'X' &&
    puzzle[row][col + 1] === 'M' &&
    puzzle[row][col + 2] === 'A' &&
    puzzle[row][col + 3] === 'S'
  );
}

function matchUp(row: number, col: number, puzzle: string[]): boolean {
  if (row < 3) return false;

  return (
    puzzle[row][col] === 'X' &&
    puzzle[row - 1][col] === 'M' &&
    puzzle[row - 2][col] === 'A' &&
    puzzle[row - 3][col] === 'S'
  );
}

function matchDown(row: number, col: number, puzzle: string[]): boolean {
  if (row >= puzzle.length - 3) return false;

  return (
    puzzle[row][col] === 'X' &&
    puzzle[row + 1][col] === 'M' &&
    puzzle[row + 2][col] === 'A' &&
    puzzle[row + 3][col] === 'S'
  );
}

function matchUpLeft(row: number, col: number, puzzle: string[]): boolean {
  if (row < 3) return false;

  return (
    puzzle[row][col] === 'X' &&
    puzzle[row - 1][col - 1] === 'M' &&
    puzzle[row - 2][col - 2] === 'A' &&
    puzzle[row - 3][col - 3] === 'S'
  );
}

function matchUpRight(row: number, col: number, puzzle: string[]): boolean {
  if (row < 3) return false;

  return (
    puzzle[row][col] === 'X' &&
    puzzle[row - 1][col + 1] === 'M' &&
    puzzle[row - 2][col + 2] === 'A' &&
    puzzle[row - 3][col + 3] === 'S'
  );
}

function matchDownLeft(row: number, col: number, puzzle: string[]): boolean {
  if (row >= puzzle.length - 3) return false;

  return (
    puzzle[row][col] === 'X' &&
    puzzle[row + 1][col - 1] === 'M' &&
    puzzle[row + 2][col - 2] === 'A' &&
    puzzle[row + 3][col - 3] === 'S'
  );
}

function matchDownRight(row: number, col: number, puzzle: string[]): boolean {
  if (row >= puzzle.length - 3) return false;

  return (
    puzzle[row][col] === 'X' &&
    puzzle[row + 1][col + 1] === 'M' &&
    puzzle[row + 2][col + 2] === 'A' &&
    puzzle[row + 3][col + 3] === 'S'
  );
}

function matchXMas(row: number, col: number, puzzle: string[]): boolean {
  if (row >= puzzle.length - 2) return false;

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
