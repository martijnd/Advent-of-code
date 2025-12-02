import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

test('2025 - Day 1: part 1', () => {
  expect(part1(exampleData)).toBe(3);
  expect(part1(data)).toBe(962);
});

test('2025 - Day 1: part 2', () => {
  expect(part2(exampleData)).toBe(6);
  expect(part2(data)).toBe(5782);
});
