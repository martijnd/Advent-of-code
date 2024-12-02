import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

test('2024 - Day 2: part 1', () => {
  expect(part1(exampleData)).toBe(2);
  expect(part1(data)).toBe(510);
});

test('2024 - Day 2: part 2', () => {
  expect(part2(exampleData)).toBe(4);
  expect(part2(data)).toBe(553);
});
