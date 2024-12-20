import {readTextFile, sumByFunc} from '../utils';

export const Day19 = {
  async Part1Answer(filename: string) {
    const input = await readTextFile(filename);
    const {towels, patterns} = parseInput(input);
    return patterns.filter((p) => getValidArrangements(p, towels)).length;
  },
  async Part2Answer(filename: string) {
    const input = await readTextFile(filename);
    const {towels, patterns} = parseInput(input);
    console.log(patterns.map((p) => getValidArrangements(p, towels)));

    return sumByFunc(patterns, (p) => getValidArrangements(p, towels));
  },
};

export function getValidArrangements(pattern: string, towels: string[]): number {
  let validArrangements = 0;
  let knownWrongPatterns: string[] = [];

  function getSubPatternValidArrangements(pattern: string): number {
    let arrangements = 0;
    // console.log('subpattern', pattern);

    if (knownWrongPatterns.includes(pattern)) {
      // console.log(`we know ${pattern} is wrong`);
      return 0;
    }

    if (towels.includes(pattern)) {
      // console.log('incrementing');
      return 1;
    }

    for (let i = 0; i < towels.length; i++) {
      const towel = towels[i];
      // console.log(`${pattern} checking ${towel}`);
      if (pattern.startsWith(towel)) {
        // console.log(`"${pattern}" starts with "${towel}"`);

        // Check if we can match the rest of the input
        const restOfPattern = pattern.slice(towel.length);
        const validSubPatternArrangements = getSubPatternValidArrangements(restOfPattern);
        if (validSubPatternArrangements) {
          console.log('incrementing', validSubPatternArrangements);

          arrangements += validSubPatternArrangements;
          return validSubPatternArrangements;
        }
      }
    }

    // Nothing matched
    if (arrangements === 0) {
      knownWrongPatterns.push(pattern);
    }

    return arrangements;
  }

  return getSubPatternValidArrangements(pattern);
  // console.log('returning from', pattern);
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
