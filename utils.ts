export async function readTextFile(filename: string) {
  const file = Bun.file(filename);
  return await file.text();
}

export async function readLines(filename: string) {
  const text = await readTextFile(filename);
  return text.split('\n');
}
