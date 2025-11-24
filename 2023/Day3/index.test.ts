import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

test.skip('2023 - Day 3: part 1', () => {
  expect(part1(exampleData)).toBe(4361);
  // expect(part1(data)).toBe(undefined)
});

// test('2023 - Day 3: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe(undefined)
// })
