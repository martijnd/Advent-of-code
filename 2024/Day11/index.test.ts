import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `125 17`

test('2024 - Day 11: part 1', () => {
  expect(part1(exampleData)).toBe(55312);
  expect(part1(data)).toBe(193607);
});

test('2024 - Day 11: part 2', () => {
  expect(part2(exampleData)).toBe(65601038650482);
  expect(part2(data)).toBe(229557103025807);
});
