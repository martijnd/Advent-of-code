import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `16,1,2,0,4,2,7,1,2,14`

test('2021 - Day 7: part 1', () => {
  expect(part1(exampleData)).toBe(37)
  expect(part1(data)).toBe(347449)
})

// test('2021 - Day 7: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe(undefined)
// })
