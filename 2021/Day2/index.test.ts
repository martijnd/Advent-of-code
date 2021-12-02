import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `forward 5
down 5
forward 8
up 3
down 8
forward 2`

test('2021 - Day 2: part 1', () => {
  expect(part1(exampleData)).toBe(150)
  expect(part1(data)).toBe(undefined)
})

// test('2021 - Day 2: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe(undefined)
// })
