import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

test('2020 - Day 8: part 1', () => {
  expect(part1(exampleData)).toBe(5)
  expect(part1(data)).toBe(1584)
})

test('2020 - Day 8: part 2', () => {
  // expect(part2(exampleData)).toBe(8)
  console.log(part2(data))
})
