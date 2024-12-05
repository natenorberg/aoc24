import {readLines, sumByFunc} from '../utils';

export const Day05 = {
  async Part1Answer(filename: string) {
    const {rules, pageLists} = await parseInput(filename);
    const correctLists = pageLists.filter((l) => checkPageList(l, rules));
    return sumByFunc(correctLists, getMiddleNumber);
  },
  async Part2Answer(filename: string) {
    return 0;
  },
};

type OrderRule = {
  before: number;
  after: number;
};

export function checkPageList(list: number[], rules: OrderRule[]): boolean {
  for (let i = 0; i < rules.length; i++) {
    const {before, after} = rules[i];
    const beforeIdx = list.findIndex((n) => n === before);
    const afterIdx = list.findIndex((n) => n === after);
    if (beforeIdx !== -1 && afterIdx !== -1 && afterIdx < beforeIdx) {
      return false;
    }
  }

  return true;
}

function getMiddleNumber(items: number[]): number {
  const middleIndex = (items.length - 1) / 2;
  return items[middleIndex];
}

async function parseInput(filename: string): Promise<{rules: OrderRule[]; pageLists: number[][]}> {
  const lines = await readLines(filename);
  const spaceIdx = lines.findIndex((l) => l === '');
  const ruleLines = lines.slice(0, spaceIdx);
  const pageLines = lines.slice(spaceIdx + 1);

  return {
    rules: ruleLines.map(parseRule),
    pageLists: pageLines.map((line) => line.split(',').map((n) => Number.parseInt(n))),
  };
}

function parseRule(input: string): OrderRule {
  const parts = input.split('|');
  return {before: Number.parseInt(parts[0]), after: Number.parseInt(parts[1])};
}

// console.log(await Day05.Part1Answer('input.txt'));
