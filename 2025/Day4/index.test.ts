import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

test('2025 - Day 4: part 1', () => {
  expect(part1(exampleData)).toBe(13);
  expect(part1(data)).toBe(1457);
});

// test('2025 - Day 4: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe(undefined)
// })
