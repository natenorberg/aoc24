import {readLines} from '../utils';

export const Day08 = {
  async Part1Answer(filename: string) {
    const lines = await readLines(filename);
    const antennas = getAntennas(lines);
    const antiNodes = getAntiNodes(lines, antennas);
    return antiNodes.length;
  },
  async Part2Answer(filename: string) {
    const lines = await readLines(filename);
    return 0;
  },
};

type AntennaMap = Record<string, Location[]>;

type Location = {
  row: number;
  col: number;
};

type Ping = {
  slope: number;
  // Cheat distance = diffX + diffY rather than pythagorean theorem.
  // Since we're only checking this when the slope is the same, it shouldn't matter
  distance: number;
};

function getAntiNodes(input: string[], map: AntennaMap): Location[] {
  let locations: Location[] = [];

  input.forEach((row, i) => {
    row.split('').forEach((_, j) => {
      if (isAntinode({row: i, col: j}, map)) {
        locations.push({row: i, col: j});
      }
    });
  });

  return locations;
}

function isAntinode(location: Location, map: AntennaMap): boolean {
  return Object.entries(map).some(([frequency, antennas]) => {
    const pings = getPings(location, antennas);
    return pings.some((pingA) =>
      pings.some((pingB) => pingA.slope === pingB.slope && pingA.distance === pingB.distance * 2),
    );
  });
}

function getPings(location: Location, antennas: Location[]): Ping[] {
  return antennas.map((antenna) => {
    const diffX = antenna.col - location.col;
    const diffY = antenna.row - location.row;
    return {
      slope: diffY / diffX,
      distance: Math.abs(diffX) + Math.abs(diffY),
    };
  });
}

// Parsing======================================================================
function getAntennas(input: string[]): AntennaMap {
  let antennas: AntennaMap = {};

  input.forEach((row, i) => {
    row.split('').forEach((cell, j) => {
      if (cell === '.') return;
      const currentAntennas = antennas[cell] ?? [];
      antennas[cell] = [...currentAntennas, {row: i, col: j}];
    });
  });

  return antennas;
}

console.log(await Day08.Part1Answer('input.txt'));
