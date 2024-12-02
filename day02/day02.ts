import {readLines} from '../utils';

export const Day02 = {
  async Part1Answer(filename: string) {
    const lines = await readLines(filename);
    const reports = lines.map(parseReport);
    const safeReports = reports.filter((r) => isSafe(r, false));
    return safeReports.length;
  },
  async Part2Answer(filename: string) {
    const lines = await readLines(filename);
    const reports = lines.map(parseReport);
    const safeReports = reports.filter((r) => isSafe(r, true));
    return safeReports.length;
  },
};

export function isSafe(report: number[], tolerant: boolean): boolean {
  const failingIdx = getFailingIndex(report);

  if (failingIdx === null) {
    return true;
  }
  if (!tolerant) {
    return false;
  }

  return isSafeWithMissingItems(report);
}

/**
 * Loop through all the items to try with them missing
 * I'm sure there's a better way to do this, but i need to get to real work now
 */
function isSafeWithMissingItems(report: number[]): boolean {
  for (let i = 0; i < report.length; i++) {
    const withoutI = [...report.slice(0, i), ...report.slice(i + 1, report.length)];
    if (isSafe(withoutI, false)) {
      return true;
    }
  }
  return false;
}

function getFailingIndex(report: number[]): number | null {
  let diffs = [0];

  for (let i = 1; i < report.length; i++) {
    const prev = report[i - 1];
    const current = report[i];
    const prevDiff = diffs[i - 1];
    const diff = current - prev;

    if (checkDiff(diff, prevDiff) === false) {
      return i;
    }
    diffs.push(diff);
  }

  return null;
}

function checkDiff(diff: number, prevDiff: number): boolean {
  if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
    return false;
  }

  // Check direction
  if ((diff > 0 && prevDiff < 0) || (diff < 0 && prevDiff > 0)) {
    return false;
  }
  return true;
}

function parseReport(line: string): number[] {
  return line.split(' ').map((n) => Number.parseInt(n));
}

console.log(await Day02.Part2Answer('input.txt'));
