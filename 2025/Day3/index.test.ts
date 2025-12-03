import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `987654321111111
811111111111119
234234234234278
818181911112111`;

test('2025 - Day 3: part 1', () => {
  expect(part1(exampleData)).toBe(357);
  expect(part1(data)).toBe(16854);
});

// test('2025 - Day 3: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe(undefined)
// })
