import getInput from '../../utils/getInput'
import { part1, part2 } from './index'

const input = getInput(__dirname)

const exampleData = [
  '1-3 a: abcde',
  '1-3 b: cdefg',
  '2-9 c: ccccccccc'
]

test('2020 - Day 2: Part 1', () => {
  expect(part1(exampleData)).toBe(2)
  expect(part1(input)).toBe(638)
})

test('2020 - Day 2: Part 2', () => {
  expect(part2(exampleData)).toBe(1)
  expect(part2(input)).toBe(699)
})
