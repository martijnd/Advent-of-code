import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

test('2024 - Day 3: part 1', () => {
  expect(part1(exampleData)).toBe(161);
  expect(part1(data)).toBe(188116424);
});

const exampleData2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

test('2024 - Day 3: part 2', () => {
  expect(part2(exampleData2)).toBe(48);
  expect(part2(data)).toBe(104245808);
});
