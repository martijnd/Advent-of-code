import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

test('2021 - Day 3: part 1', () => {
  expect(part1(exampleData)).toBe(198)
  expect(part1(data)).toBe(4139586)
})

test('2021 - Day 3: part 2', () => {
  expect(part2(exampleData)).toBe(230)
  expect(part2(data)).toBe(1800151)
})
