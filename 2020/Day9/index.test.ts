import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`

test('2020 - Day 9: part 1', () => {
  expect(part1(exampleData, 5)).toBe(127)
  expect(part1(data, 25)).toBe(88311122)
})
