import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

test('2022 - Day 4: part 1', () => {
  expect(part1(exampleData)).toBe(2);
  expect(part1(data)).toBe(511);
});

test('2022 - Day 4: part 2', () => {
  expect(part2(exampleData)).toBe(4);
  expect(part2(data)).toBe(821);
});
