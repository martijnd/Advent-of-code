import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

test('2022 - Day 1: part 1', () => {
  expect(part1(exampleData)).toBe(24000);
  expect(part1(data)).toBe(67027);
});

test('2022 - Day 1: part 2', () => {
  expect(part2(exampleData)).toBe(45000);
  expect(part2(data)).toBe(197291);
});
