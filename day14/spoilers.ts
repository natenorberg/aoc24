import {Coordinates, Dimensions} from './day14';

/**
 * Check if the position contains a Christmas tree.
 * Implementation hidden to prevent spoilers if you're just looking at day14.ts
 */
export function isChristmasTree(
  positions: Coordinates[],
  index: number,
  dimensions: Dimensions,
): boolean {
  /**
   * Simple algorithm that has nothing to do with how a Christmas tree looks
   *
   * I figured the author of the puzzle probably drew the Christmas tree first and then used that
   * to generate the rest of the puzzle. My theory was that if they started by drawing the
   * Christmas tree, then the correct frame wouldn't have any overlapping bots.
   * Lucky for me, this ended up being correct
   *
   * So all this algorithm does is to check that all the robots are at different positions
   */
  const unique = new Set(positions.map((p) => `${p.x}-${p.y}`));
  return unique.size === positions.length;
}
