import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `F10
N3
F7
R90
F11`

test('2020 - Day 12: part 1', () => {
  expect(part1(exampleData)).toBe(25)
  expect(part1(data)).toBe(0)
})

// test('2020 - Day 12: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe()
// })
