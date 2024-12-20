import {readTextFile} from '../utils';

export const Day19 = {
  async Part1Answer(filename: string) {
    const input = await readTextFile(filename);
    const {towels, patterns} = parseInput(input);
    return patterns.filter((p) => isPatternValid(p, towels)).length;
  },
  async Part2Answer(filename: string) {
    const input = await readTextFile(filename);
    return 0;
  },
};

export function isPatternValid(pattern: string, towels: string[]): boolean {
  let knownWrongPatterns: string[] = [];

  function isSubPatternValid(pattern: string): boolean {
    if (knownWrongPatterns.includes(pattern)) {
      return false;
    }

    if (towels.includes(pattern)) {
      return true;
    }

    for (let i = 0; i < towels.length; i++) {
      const towel = towels[i];
      if (pattern.startsWith(towel)) {
        // Check if we can match the rest of the input
        const restOfPattern = pattern.slice(towel.length);
        if (isSubPatternValid(restOfPattern)) {
          return true;
        }
      }
    }

    // Nothing matched
    knownWrongPatterns.push(pattern);
    return false;
  }

  return isSubPatternValid(pattern);
}

// Parsing =====================================================================
export function parseInput(input: string): {towels: string[]; patterns: string[]} {
  const parts = input.split('\n\n');

  return {
    towels: parts[0].split(', '),
    patterns: parts[1].split('\n'),
  };
}

// console.log(await Day19.Part1Answer('input.txt'));
