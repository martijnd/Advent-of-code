import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

test('2022 - Day 3: part 1', () => {
  expect(part1(exampleData)).toBe(157);
  expect(part1(data)).toBe(7446);
});

test('2022 - Day 3: part 2', () => {
  expect(part2(exampleData)).toBe(70);
  expect(part2(data)).toBe(2646);
});
