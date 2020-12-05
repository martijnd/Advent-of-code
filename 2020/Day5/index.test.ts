import { getSum, part1, part2 } from './index'

import input from './input'

test('2020 - Day 5: part 1', () => {
  expect(getSum('FBFBBFFRLR')).toBe(357)
  expect(getSum('BFFFBBFRRR')).toBe(567)
  expect(getSum('FFFBBBFRRR')).toBe(119)
  expect(getSum('BBFFBBFRLL')).toBe(820)

  expect(part1(input)).toBe(864)
})

test('2020 - Day 5: part 2', () => {
  expect(part2(input)).toBe(739)
})
