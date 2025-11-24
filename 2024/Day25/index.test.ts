import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

test('2024 - Day 25: part 1', () => {
  expect(part1(data)).toBe(2900);
});

// test('2024 - Day 25: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe(undefined)
// })
