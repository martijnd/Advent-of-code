import getInput from '../../utils/getInput'
import { part1, part2 } from './index'

const input = getInput(__dirname).map(i => +i)

// part 1
const exampleData = [
  1721,
  979,
  366,
  299,
  675,
  1456
]
test('2020 - day 1', () => {
  expect(part1(exampleData)).toEqual(514579)
  console.log(part1(input))

  // Part 2
  expect(part2(exampleData)).toEqual(241861950)
  console.log(part2(input))
})
