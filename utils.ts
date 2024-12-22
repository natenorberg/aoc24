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
