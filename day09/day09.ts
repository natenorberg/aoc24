import {readTextFile, sumByFunc} from '../utils';

export const Day09 = {
  async Part1Answer(filename: string) {
    const input = await readTextFile(filename);
    const items = parseItems(input);
    const condensed = condenseDisk(items);
    return checkSum(condensed);
  },
  async Part2Answer(filename: string) {
    const input = await readTextFile(filename);
    return 0;
  },
};

type File = {
  type: 'file';
  id: number;
  size: number;
};

type EmptySpace = {
  type: 'empty';
  size: number;
};

type DiskItem = File | EmptySpace;

type Block = {fileId: number};

function condenseDisk(originalItems: DiskItem[]): DiskItem[] {
  let nextDisk = [...originalItems];

  while (nextDisk.some((i) => i.type === 'empty')) {
    const lastBlock = nextDisk.at(-1);
    // If the last block is blank, remove it
    if (lastBlock?.type === 'empty') {
      nextDisk.pop();
      continue;
    }
    const firstEmpty = nextDisk.find((item) => item.type === 'empty');
    if (!firstEmpty || !lastBlock) {
      throw new Error("while loop shouldn't get here");
    }

    const movingAmount = Math.min(firstEmpty.size, lastBlock.size);
    const firstEmptyIndex = nextDisk.findIndex((item) => item.type === 'empty');

    // Deal with last block
    if (movingAmount === lastBlock.size) {
      // Moving the whole block
      nextDisk.pop();
    } else {
      // Moving part of the block
      lastBlock.size = lastBlock.size - movingAmount;
    }

    // Add block to space
    if (movingAmount === firstEmpty.size) {
      // Taking up whole empty space. Remove the empty one
      nextDisk.splice(firstEmptyIndex, 1, {type: 'file', id: lastBlock.id, size: movingAmount});
    } else {
      // Not using up all the free space. Add the file and lower the amount of free space
      nextDisk.splice(firstEmptyIndex, 0, {type: 'file', id: lastBlock.id, size: movingAmount});
      firstEmpty.size = firstEmpty.size - movingAmount;
    }

    // console.log(getDiskText(nextDisk));
  }

  return nextDisk;
}

/**
 * @deprecated - Only works if there are less than 10 files
 */
function getDiskText(items: DiskItem[]): string {
  let disk = '';
  items.forEach((item) => {
    const nextText = Array.from({length: item.size}, () =>
      item.type === 'file' ? item.id : '.',
    ).join('');
    disk += nextText;
  });
  return disk;
}

/**
 * @deprecated - Only works if there are less than 10 files
 */
export function checkSumSimple(disk: string): number {
  let sum = 0;
  disk.split('').forEach((v, i) => {
    sum += Number.parseInt(v) * i;
  });
  return sum;
}

function checkSum(items: DiskItem[]): number {
  let blocks: Block[] = [];
  items.forEach((file) => {
    if (file.type === 'empty') return;
    const newBlocks: Block[] = Array.from({length: file.size}, () => ({fileId: file.id}));
    blocks.push(...newBlocks);
  });

  let sum = 0;
  blocks.forEach((block, i) => {
    sum += block.fileId * i;
  });
  return sum;
}

// Parsing======================================================================
function parseItems(input: string): DiskItem[] {
  let nextId = 0;
  return input.split('').map((size, i) => {
    if (i % 2 === 0) {
      const item = {type: 'file' as const, id: nextId, size: Number.parseInt(size)};
      nextId++;
      return item;
    }
    return {type: 'empty', size: Number.parseInt(size)};
  });
}

// console.log(await Day09.Part1Answer('input.txt'));
