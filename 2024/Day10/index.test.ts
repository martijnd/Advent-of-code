import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`

test('2024 - Day 10: part 1', () => {
  expect(part1(exampleData)).toBe(36);
  expect(part1(data)).toBe(733);
});

test('2024 - Day 10: part 2', () => {
  expect(part2(exampleData)).toBe(81);
  expect(part2(data)).toBe(1514);
});
