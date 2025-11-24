import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

test('2024 - Day 19: part 1', () => {
  expect(part1(exampleData)).toBe(6);
  expect(part1(data)).toBe(317);
});

test('2024 - Day 19: part 2', () => {
  expect(part2(exampleData)).toBe(16);
  expect(part2(data)).toBe(883443544805484);
});
