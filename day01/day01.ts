import {readLines} from '../utils';

export const Day01 = {
  async Part1Answer(filename: string) {
    const {left, right} = await parseLists(filename);
    let totalDifference = 0;

    left.forEach((leftItem, i) => {
      const rightItem = right[i];
      totalDifference += Math.abs(rightItem - leftItem);
    });

    return totalDifference;
  },
  async Part2Answer(filename: string) {
    const {left, right} = await parseLists(filename);
    let score = 0;

    left.forEach((v, i) => {
      const matches = right.filter((n) => n == v).length;
      score += v * matches;
    });

    return score;
  },
};

async function parseLists(filename: string) {
  const lines = await readLines(filename);
  let leftList: number[] = [];
  let rightList: number[] = [];
  lines.forEach((line) => {
    const {left, right} = parseLine(line);
    leftList.push(left);
    rightList.push(right);
  });

  // Sort lists
  leftList = leftList.sort((a, b) => a - b);
  rightList = rightList.sort((a, b) => a - b);

  return {left: leftList, right: rightList};
}

function parseLine(line: string): {left: number; right: number} {
  const parts = line.split('   ');
  return {left: Number.parseInt(parts[0]), right: Number.parseInt(parts[1])};
}

console.log(await Day01.Part2Answer('input.txt'));
