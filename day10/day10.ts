import {readLines, sumByFunc} from '../utils';

export const Day10 = {
  async Part1Answer(filename: string) {
    const lines = await readLines(filename);
    const map = parseMap(lines);
    const trailheads = getPossibleTrailheads(map);
    return sumByFunc(trailheads, (t) => getScore(t, map));
  },
  async Part2Answer(filename: string) {
    const lines = await readLines(filename);
    const map = parseMap(lines);
    const trailheads = getPossibleTrailheads(map);
    return sumByFunc(trailheads, (t) => getRating(t, map));
  },
};

type Location = {row: number; col: number};

type Peak = Location & {id: string};

function getPossibleTrailheads(map: number[][]): Location[] {
  let trailheads: Location[] = [];
  map.forEach((row, i) => {
    row.forEach((location, j) => {
      if (location === 0) {
        trailheads.push({row: i, col: j});
      }
    });
  });
  return trailheads;
}

/**
 * Get adjacent spots that are 1 higher than the current
 */
function getNextSteps(location: Location, elevation: number, map: number[][]): Location[] {
  let steps: Location[] = [];
  if (map[location.row - 1]?.[location.col] === elevation + 1) {
    steps.push({row: location.row - 1, col: location.col});
  }
  if (map[location.row]?.[location.col + 1] === elevation + 1) {
    steps.push({row: location.row, col: location.col + 1});
  }
  if (map[location.row + 1]?.[location.col] === elevation + 1) {
    steps.push({row: location.row + 1, col: location.col});
  }
  if (map[location.row]?.[location.col - 1] === elevation + 1) {
    steps.push({row: location.row, col: location.col - 1});
  }
  return steps;
}

// Part 1 ======================================================================

function getPeaks(location: Location, map: number[][]): Peak[] {
  const elevation = map[location.row][location.col];

  // Base case: Made it to the top!
  if (elevation === 9) return [{...location, id: `${location.row}-${location.col}`}];

  const nextSteps = getNextSteps(location, elevation, map);

  let peaks: Peak[] = [];
  nextSteps.forEach((step) => {
    peaks.push(...getPeaks(step, map));
  });
  return peaks;
}

function getScore(location: Location, map: number[][]): number {
  const peaks = getPeaks(location, map);
  // Get count of distinct peaks
  return Array.from(new Set(peaks.map((p) => p.id))).length;
}

// Part 2 ======================================================================

/**
 * Gets the rating for the location, assuming you have a valid path up to this point
 */
function getRating(location: Location, map: number[][]): number {
  const elevation = map[location.row][location.col];

  // Base case: Made it to the top!
  if (elevation === 9) return 1;

  const nextSteps = getNextSteps(location, elevation, map);
  return sumByFunc(nextSteps, (step) => getRating(step, map));
}

// Parsing======================================================================
function parseMap(input: string[]): number[][] {
  return input.map((row) => row.split('').map((n) => Number.parseInt(n)));
}

// console.log(await Day10.Part2Answer('input.txt'));
