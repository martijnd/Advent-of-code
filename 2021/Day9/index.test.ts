import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `2199943210
3987894921
9856789892
8767896789
9899965678`

test('2021 - Day 9: part 1', () => {
  expect(part1(exampleData)).toBe(undefined)
  // expect(part1(data)).toBe(undefined)
})

// test('2021 - Day 9: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe(undefined)
// })
