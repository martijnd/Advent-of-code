import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `3,4,3,1,2`

test('2021 - Day 6: part 1', () => {
  expect(part1(exampleData)).toBe(5934)
  expect(part1(data)).toBe(372984)
})

test('2021 - Day 6: part 2', () => {
  expect(part2(exampleData)).toBe(26984457539)
  expect(part2(data)).toBe(1681503251694)
})
