import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `A Y
B X
C Z`;

test('2022 - Day 2: part 1', () => {
  expect(part1(exampleData)).toBe(15);
  expect(part1(data)).toBe(13268);
});

test('2022 - Day 2: part 2', () => {
  expect(part2(exampleData)).toBe(12);
  expect(part2(data)).toBe(15508);
});
