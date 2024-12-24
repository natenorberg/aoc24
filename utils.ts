export async function readTextFile(filename: string) {
  const file = Bun.file(filename);
  return await file.text();
}

export async function readLines(filename: string) {
  const text = await readTextFile(filename);
  return text.split('\n');
}

export function sum(items: number[]): number {
  return items.reduce((total, item) => {
    return total + item;
  }, 0);
}

export function sumProperty<T>(items: T[], property: keyof T): number {
  return items.reduce((total, item) => {
    return total + (item[property] as number);
  }, 0);
}

export function sumByFunc<T>(items: T[], value: (item: T) => number) {
  return items.reduce((total, item) => {
    return total + value(item);
  }, 0);
}

export const alphabeticallyBy =
  <T>(property: keyof T) =>
  (a: T, b: T) => {
    if (typeof a[property] === 'string' && typeof b[property] === 'string') {
      return alphabetically(a[property] as unknown as string, b[property] as unknown as string);
    }

    return 0;
  };

const alphabetically = (a: string, b: string) => {
  if (a.toLowerCase() > b.toLowerCase()) {
    return 1;
  }
  if (a.toLowerCase() < b.toLowerCase()) {
    return -1;
  }

  return 0;
};
