import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

test('2024 - Day 14: part 1', () => {
  expect(part1(exampleData)).toBe(12);
  expect(part1(data)).toBe(221142636);
});

test('2024 - Day 14: part 2', () => {
  expect(part2(data)).toBe(7916);
});
