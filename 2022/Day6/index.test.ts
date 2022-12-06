import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `bvwbjplbgvbhsrlpgdmjqwftvncz`;

test('2022 - Day 6: part 1', () => {
  expect(part1(exampleData)).toBe(5);
  expect(part1(data)).toBe(1850);
});

test('2022 - Day 6: part 2', () => {
  expect(part2('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(19);
  expect(part2(data)).toBe(2823);
});
