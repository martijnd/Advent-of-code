import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

test('2025 - Day 5: part 1', () => {
  expect(part1(exampleData)).toBe(3);
  expect(part1(data)).toBe(505);
});

// test('2025 - Day 5: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe(undefined)
// })
