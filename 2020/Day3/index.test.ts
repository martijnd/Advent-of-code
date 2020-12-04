import getInput from '../../utils/getInput'
import { part1, part2 } from './index'

const input = getInput(__dirname).split('\n')

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
  expect(part1(exampleData)).toBe(7)
  expect(part1(input)).toBe(254)
})

test('2020 - Day 3: Part 2', () => {
  expect(part2(exampleData)).toBe(336)
  expect(part2(input)).toBe(1666768320)
})
