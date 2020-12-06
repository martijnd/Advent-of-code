import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const input = getInput(__dirname).split('\n').map(i => +i)

// part 1
const exampleData = [
  1721,
  979,
  366,
  299,
  675,
  1456
]
test('2020 - Day 1: Part 1', () => {
  expect(part1(exampleData)).toEqual(514579)
  expect(part1(input)).toEqual(972576)
})

test('2020 - Day 1: Part 2', () => {
  expect(part2(exampleData)).toEqual(241861950)
  expect(part2(input)).toEqual(199300880)
})
