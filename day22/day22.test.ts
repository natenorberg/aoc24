import {test, expect} from 'bun:test';
import {Day22, nextSecret} from './day22';

test('Part1 test answer', async () => {
  const answer = await Day22.Part1Answer('test-input.txt');
  expect(answer).toBe(37327623);
});

test('Part1 real answer', async () => {
  const answer = await Day22.Part1Answer('input.txt');
  expect(answer).toBe(13753970725);
});

test.skip('Part2 test answer', async () => {
  const answer = await Day22.Part2Answer('test-input.txt');
  expect(answer).toBe(1);
});

test.skip('Part2 real answer', async () => {
  const answer = await Day22.Part2Answer('input.txt');
  expect(answer).toBe(1);
});

test('nextSecret', () => {
  let secret = 123;
  secret = nextSecret(secret);
  expect(secret).toBe(15887950);
  secret = nextSecret(secret);
  expect(secret).toBe(16495136);
  secret = nextSecret(secret);
  expect(secret).toBe(527345);
  secret = nextSecret(secret);
  expect(secret).toBe(704524);
  secret = nextSecret(secret);
  expect(secret).toBe(1553684);
  secret = nextSecret(secret);
  expect(secret).toBe(12683156);
  secret = nextSecret(secret);
  expect(secret).toBe(11100544);
  secret = nextSecret(secret);
  expect(secret).toBe(12249484);
  secret = nextSecret(secret);
  expect(secret).toBe(7753432);
  secret = nextSecret(secret);
  expect(secret).toBe(5908254);
});
