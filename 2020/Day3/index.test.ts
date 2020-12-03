import getFile from '../../utils/getFile'
import { part1, part2 } from './index'

const input = getFile(__dirname)

const exampleData = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#'
]

test('2020 - Day 3: Part 1', () => {
  console.log(part1(input))
  expect(part1(exampleData)).toBe(7)
})

test('2020 - Day 3: Part 2', () => {
  console.log(part2(input))
  expect(part2(exampleData)).toBe(336)
})
