import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

test('2025 - Day 9: part 1', () => {
  expect(part1(exampleData)).toBe(50);
  expect(part1(data)).toBe(4763509452);
});

// test('2025 - Day 9: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe(undefined)
// })
