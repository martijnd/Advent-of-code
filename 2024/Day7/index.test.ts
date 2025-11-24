import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

test('2024 - Day 7: part 1', () => {
  expect(part1(exampleData)).toBe(3749);
  expect(part1(data)).toBe(6083020304036);
});

test('2024 - Day 7: part 2', () => {
  expect(part2(exampleData)).toBe(11387);
  expect(part2(data)).toBe(59002246504791);
});
