import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

test('2025 - Day 6: part 1', () => {
  expect(part1(exampleData)).toBe(4277556);
  expect(part1(data)).toBe(5171061464548);
});

test('2025 - Day 6: part 2', () => {
  expect(part2(exampleData)).toBe(3263827);
  expect(part2(data)).toBe(10189959087258);
});
