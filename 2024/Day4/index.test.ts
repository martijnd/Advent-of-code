import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

test('2024 - Day 4: part 1', () => {
  expect(part1(exampleData)).toBe(18);
  expect(part1(data)).toBe(2567);
});

test('2024 - Day 4: part 2', () => {
  expect(part2(exampleData)).toBe(9);
  expect(part2(data)).toBe(2029);
});
