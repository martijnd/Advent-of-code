import input from './input';
import { part1, part2 } from './index';

const exampleData = [
  '1-3 a: abcde',
  '1-3 b: cdefg',
  '2-9 c: ccccccccc'
]


test('2020 - Day 1: Part 1', () => {
  console.log(part1(input));
  expect(part1(exampleData)).toBe(2);
});

test('2020 - Day 1: Part 2', () => {
  console.log(part2(input));
  expect(part2(exampleData)).toBe(1);
});