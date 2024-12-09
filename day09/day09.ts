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
    const items = parseItems(input);
    const condensed = condenseDiskWithWholeFiles(items);
    return checkSum(condensed);
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

type Block = {fileId?: number};

// Part 1 ======================================================================
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

// Part 2 ======================================================================
function condenseDiskWithWholeFiles(originalItems: DiskItem[]): DiskItem[] {
  let nextDisk = [...originalItems];

  const fileIdsToMove: number[] = nextDisk
    .slice()
    .reverse()
    .filter((item) => item.type === 'file')
    .map((f) => f.id);

  fileIdsToMove.forEach((fileId) => {
    const fileIdx = nextDisk.findIndex((item) => item.type === 'file' && item.id === fileId);
    const file = nextDisk[fileIdx];
    if (!file) return;
    if (file.type !== 'file') {
      throw new Error('not a file');
    }

    const emptySpaceIdx = nextDisk.findIndex(
      (item) => item.type === 'empty' && item.size >= file.size,
    );
    if (emptySpaceIdx === -1 || emptySpaceIdx > fileIdx) {
      // Can't find anywhere to put the file
      return;
    }

    const emptySpace = nextDisk[emptySpaceIdx];
    nextDisk.splice(fileIdx, 1, {type: 'empty', size: file.size});
    if (file.size === emptySpace.size) {
      // Sizes are the same. Remove the empty space
      nextDisk.splice(emptySpaceIdx, 1, file);
    } else {
      // More space than we need. Need to adjust the size
      emptySpace.size = emptySpace.size - file.size;
      nextDisk.splice(emptySpaceIdx, 0, file);
    }
  });

  return nextDisk;
}

// Scoring =====================================================================

function checkSum(items: DiskItem[]): number {
  let blocks: Block[] = [];
  items.forEach((file) => {
    const fileId = file.type === 'file' ? file.id : undefined;
    const newBlocks: Block[] = Array.from({length: file.size}, () => ({fileId}));
    blocks.push(...newBlocks);
  });

  let sum = 0;
  blocks.forEach((block, i) => {
    if (block.fileId !== undefined) {
      sum += block.fileId * i;
    }
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

// console.log(await Day09.Part2Answer('input.txt'));
