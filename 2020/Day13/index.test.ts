import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

import { test, expect } from 'vitest';

const data = getInput(__dirname)

const exampleData = `939
7,13,x,x,59,x,31,19`

test('2020 - Day 13: part 1', () => {
  expect(part1(exampleData)).toBe(295)
  expect(part1(data)).toBe(4315)
})

const exampleData2 = '7,13,x,x,59,x,31,19'

test('2020 - Day 13: part 2', () => {
  expect(part2(exampleData2, 1068781)).toBe(1068781)
  expect(part2('17,x,13,19', 3417)).toBe(3417)
  expect(part2('67,7,59,61', 754018)).toBe(754018)
  expect(part2('67,x,7,59,61', 779210)).toBe(779210)
  expect(part2('67,7,x,59,61', 1261476)).toBe(1261476)
  expect(part2('1789,37,47,1889', 1202161486)).toBe(1202161486)
  // expect(part2(data.split('\n')[1], 100000000000000)).toBe(undefined)
})
