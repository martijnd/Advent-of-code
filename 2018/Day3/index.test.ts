import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`;

test('2018 - Day 3: part 1', () => {
  expect(part1(exampleData)).toBe(4);
  expect(part1(data)).toBe(106501);
});

test('2018 - Day 3: part 2', () => {
  expect(part2(exampleData)).toBe(3);
  expect(part2(data)).toBe(632);
});
