import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `939
7,13,x,x,59,x,31,19`

test('2020 - Day 13: part 1', () => {
  expect(part1(exampleData)).toBe(295)
  expect(part1(data)).toBe(4315)
})
