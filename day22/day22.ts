import {readLines, sum} from '../utils';

export const Day22 = {
  async Part1Answer(filename: string) {
    const initialSecrets = (await readLines(filename)).map((n) => Number.parseInt(n));
    const finalSecrets = initialSecrets.map((s) => generateSecrets(s, 2000));
    return sum(finalSecrets);
  },
  async Part2Answer(filename: string) {
    const lines = await readLines(filename);
    return 0;
  },
};

function generateSecrets(initial: number, times: number): number {
  let secret = initial;
  for (let i = 0; i < times; i++) {
    secret = nextSecret(secret);
  }
  return secret;
}

export function nextSecret(prevSecret: number): number {
  let secret = prevSecret;
  // First bullet
  secret = mix(secret * 64, secret);
  secret = prune(secret);

  // Second bullet
  secret = mix(Math.floor(secret / 32), secret);
  secret = prune(secret);

  // Third bullet
  secret = mix(secret * 2048, secret);
  secret = prune(secret);

  return secret;
}

function mix(a: number, b: number) {
  return a ^ b;
}

// I'm starting to hate AoC
const modulo = (a: number, b: number) => ((a % b) + b) % b;

function prune(num: number) {
  return modulo(num, 16777216);
}

// console.log(await Day22.Part1Answer('input.txt'));
