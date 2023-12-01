import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

test('2023 - Day 1: part 1', () => {
  expect(part1(exampleData)).toBe(142);
  expect(part1(data)).toBe(1832);
});

test('2023 - Day 1: part 2', () => {});
