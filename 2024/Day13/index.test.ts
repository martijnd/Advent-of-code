import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

test('2024 - Day 13: part 1', () => {
  expect(part1(exampleData)).toBe(480);
  expect(part1(data)).toBe(31552);
});

test('2024 - Day 13: part 2', () => {
  expect(part2(exampleData)).toBe(875318608908);
  expect(part2(data)).toBe(95273925552482);
});
