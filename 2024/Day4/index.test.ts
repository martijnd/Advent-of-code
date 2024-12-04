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
  expect(part1(data)).toBe(undefined);
});

// test('2024 - Day 4: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe(undefined)
// })
