import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

test('2023 - Day 2: part 1', () => {
  expect(part1(exampleData)).toBe(8);
  expect(part1(data)).toBe(2720);
});

test('2023 - Day 2: part 2', () => {
  expect(part2(exampleData)).toBe(2286);
  expect(part2(data)).toBe(71535);
});
