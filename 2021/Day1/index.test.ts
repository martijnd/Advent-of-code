import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)
const sample = `199
200
208
210
200
207
240
269
260
263`

test('2021 - Day 1: part 1', () => {
  // expect(part1(sample)).toBe(7)
  expect(part1(data)).toBe(1316)
})

test('2021 - Day 1: part 2', () => {
  expect(part2(sample)).toBe(5)
  expect(part2(data)).toBe(1344)
})

