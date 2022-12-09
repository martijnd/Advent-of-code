import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

test('2022 - Day 9: part 1', () => {
  expect(part1(exampleData)).toBe(13);
  expect(part1(data)).toBe(6642);
});

// test('2022 - Day 9: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe(undefined)
// })
