import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const input = getInput(__dirname)
const exampleData = `abc

a
b
c

ab
ac

a
a
a
a

b`

test('2020 - Day 6: part 1', () => {
  expect(part1(exampleData)).toBe(11)
  expect(part1(input)).toBe(6430)
})

test('2020 - Day 6: part 2', () => {
  expect(part2(exampleData)).toBe(6)
  expect(part2(input)).toBe(3125)
})
