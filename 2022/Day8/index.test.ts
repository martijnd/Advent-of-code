import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `30373
25512
65332
33549
35390`;

test('2022 - Day 8: part 1', () => {
  expect(part1(exampleData)).toBe(21);
  expect(part1(data)).toBe(1832);
});

test('2022 - Day 8: part 2', () => {
  expect(part2(exampleData)).toBe(8);
  expect(part2(data)).toBe(157320);
});
