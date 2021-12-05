import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

test('2021 - Day 5: part 1', () => {
  expect(part1(exampleData)).toBe(5)
  expect(part1(data)).toBe(6841)
})

// test('2021 - Day 5: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe(undefined)
// })
