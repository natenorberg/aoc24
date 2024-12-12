import {readLines, sumByFunc} from '../utils';

export const Day12 = {
  async Part1Answer(filename: string) {
    const map = await readLines(filename);
    const regions = findRegions(map);
    return sumByFunc(regions, getPrice);
  },
  async Part2Answer(filename: string) {
    const map = await readLines(filename);
    return 0;
  },
};

type Boundaries = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
};

type Location = {
  row: number;
  col: number;
};

type Plot = Location & {
  boundaries: Boundaries;
};

type Region = {
  plant: string;
  plots: Plot[];
};

export function findRegions(map: string[]): Region[] {
  let explored: boolean[][] = Array.from(map, (row) => Array.from(row, () => false));
  let nextUnexplored = getNextUnexploredPlot(explored);

  function discoverRegion(startLocation: Location, map: string[]): Region {
    let frontier = [startLocation];
    const plant = map[startLocation.row][startLocation.col];

    let region: Region = {plant, plots: []};

    while (frontier.length) {
      const next = frontier[0];
      explored[next.row][next.col] = true;
      const boundaries = checkBoundaries(next, map);
      const plot = {...next, boundaries};
      region.plots.push(plot);
      // get next locations and filter out ones we've done already
      const nextLocations = expandFrontier(plot).filter(
        (l) =>
          !region.plots.some((p) => p.row === l.row && p.col === l.col) &&
          !frontier.some((f) => f.row === l.row && f.col === l.col),
      );
      frontier.push(...nextLocations);

      // Remove first item
      frontier.splice(0, 1);
    }

    return region;
  }

  let regions: Region[] = [];

  while (nextUnexplored) {
    regions.push(discoverRegion(nextUnexplored, map));

    // Start next region
    nextUnexplored = getNextUnexploredPlot(explored);
  }

  return regions;
}

function checkBoundaries(location: Location, map: string[]): Boundaries {
  const {row, col} = location;
  const plant = map[row][col];
  let boundaries = {top: true, right: true, bottom: true, left: true};

  if (map[row - 1]?.[col] === plant) {
    boundaries.top = false;
  }
  if (map[row][col + 1] === plant) {
    boundaries.right = false;
  }
  if (map[row + 1]?.[col] === plant) {
    boundaries.bottom = false;
  }
  if (map[row][col - 1] === plant) {
    boundaries.left = false;
  }

  return boundaries;
}

/**
 * Get the plots that are adjacent and not blocked off
 */
function expandFrontier(plot: Plot): Location[] {
  let next: Location[] = [];
  if (!plot.boundaries.top) {
    next.push({row: plot.row - 1, col: plot.col});
  }
  if (!plot.boundaries.right) {
    next.push({row: plot.row, col: plot.col + 1});
  }
  if (!plot.boundaries.bottom) {
    next.push({row: plot.row + 1, col: plot.col});
  }
  if (!plot.boundaries.left) {
    next.push({row: plot.row, col: plot.col - 1});
  }

  return next;
}

function getNextUnexploredPlot(explored: boolean[][]): Location | undefined {
  for (let i = 0; i < explored.length; i++) {
    for (let j = 0; j < explored[0].length; j++) {
      if (!explored[i][j]) {
        return {row: i, col: j};
      }
    }
  }
  return undefined;
}

// Part 1 =====================================================================
function getPrice(region: Region): number {
  const area = region.plots.length;
  const perimeter = sumByFunc(
    region.plots,
    (p) => Object.values(p.boundaries).filter(Boolean).length,
  );
  return area * perimeter;
}

// console.log(await Day12.Part2Answer('input.txt'));
