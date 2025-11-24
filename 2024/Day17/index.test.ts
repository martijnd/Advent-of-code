import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

const exampleData2 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;

test('2024 - Day 17: part 1', () => {
  expect(part1(exampleData)).toBe('4,6,3,5,6,3,5,2,1,0');
  expect(part1(data)).toBe('6,7,5,2,1,3,5,1,7');
});

test.skip('2024 - Day 17: part 2', () => {
  expect(part2(exampleData2)).toBe(117440);
  expect(part2(data)).toBe(265061364597659);
});
