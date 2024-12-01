import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `3   4
4   3
2   5
1   3
3   9
3   3`;

test('2024 - Day 1: part 1', () => {
  expect(part1(exampleData)).toBe(11);
  expect(part1(data)).toBe(2367773);
});

test('2024 - Day 1: part 2', () => {
  expect(part2(exampleData)).toBe(31);
  expect(part2(data)).toBe(21271939);
});
