import {readLines} from '../utils';

export const Day08 = {
  async Part1Answer(filename: string) {
    const lines = await readLines(filename);
    const antennas = getAntennas(lines);
    const antiNodes = getAntiNodes(lines, antennas, false);
    return antiNodes.length;
  },
  async Part2Answer(filename: string) {
    const lines = await readLines(filename);
    const antennas = getAntennas(lines);
    const antiNodes = getAntiNodes(lines, antennas, true);

    return antiNodes.length;
  },
};

type AntennaMap = Record<string, Antenna[]>;

type Location = {
  row: number;
  col: number;
};

type Antenna = Location & {id: number};

type Ping = {
  antenna: Antenna;
  slope: number;
  // Cheat distance = diffX + diffY rather than pythagorean theorem.
  // Since we're only checking this when the slope is the same, it shouldn't matter
  distance: number;
};

function getAntiNodes(input: string[], map: AntennaMap, ignoreDistance: boolean): Location[] {
  let locations: Location[] = [];

  input.forEach((row, i) => {
    row.split('').forEach((_, j) => {
      if (isAntinode({row: i, col: j}, map, ignoreDistance)) {
        locations.push({row: i, col: j});
      }
    });
  });

  return locations;
}

function isAntinode(location: Location, map: AntennaMap, ignoreDistance: boolean): boolean {
  return Object.values(map).some((antennas) => {
    const pings = getPings(location, antennas);
    return pings.some((pingA) => {
      return ignoreDistance
        ? pings.some((pingB) => {
            if (pingA.antenna.id === pingB.antenna.id) return false;
            if (pingA.antenna.row === location.row && pingA.antenna.col === location.col) {
              // If there is more than one antenna. All antennas are also anti-nodes
              return true;
            }
            return pingA.slope === pingB.slope;
          })
        : pings.some(
            (pingB) => pingA.slope === pingB.slope && pingA.distance === pingB.distance * 2,
          );
    });
  });
}

function getPings(location: Location, antennas: Antenna[]): Ping[] {
  return antennas.map((antenna) => {
    const diffX = antenna.col - location.col;
    const diffY = antenna.row - location.row;
    return {
      antenna: antenna,
      slope: diffY / diffX,
      distance: Math.abs(diffX) + Math.abs(diffY),
    };
  });
}

// Parsing======================================================================
function getAntennas(input: string[]): AntennaMap {
  let antennas: AntennaMap = {};
  let nextId = 0;

  input.forEach((row, i) => {
    row.split('').forEach((cell, j) => {
      if (cell === '.') return;
      const currentAntennas = antennas[cell] ?? [];
      antennas[cell] = [...currentAntennas, {row: i, col: j, id: nextId}];
      nextId++;
    });
  });

  return antennas;
}

console.log(await Day08.Part2Answer('input.txt'));
