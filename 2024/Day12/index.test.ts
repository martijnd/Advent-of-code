import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `AAAA
BBCD
BBCC
EEEC`;

const exampleData2 = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;

const exampleData3 = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

test('2024 - Day 12: part 1', () => {
  expect(part1(exampleData)).toBe(140);
  expect(part1(exampleData2)).toBe(772);
  expect(part1(exampleData3)).toBe(1930);
  expect(part1(data)).toBe(1431316);
});

test('2024 - Day 12: part 2', () => {
  expect(part2(exampleData)).toBe(80);
  expect(part2(exampleData2)).toBe(436);
  expect(part2(exampleData3)).toBe(1206);
  expect(part2(data)).toBe(821428);
});
