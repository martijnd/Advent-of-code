import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `2333133121414131402`;

test('2024 - Day 9: part 1', () => {
  expect(part1(exampleData)).toBe(1928);
  expect(part1(data)).toBe(6398608069280);
});

test('2024 - Day 9: part 2', () => {
  expect(part2(exampleData)).toBe(2858);
  expect(part2(data)).toBe(6427437134372);
});
