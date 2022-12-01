import { part1, part2 } from './index'

import { test, expect } from 'vitest';

const data = '2,0,1,9,5,19'

const exampleData = {
  '1,3,2': 1,
  '2,1,3': 10,
  '1,2,3': 27,
  '2,3,1': 78,
  '3,2,1': 438,
  '3,1,2': 1836
}

test('2020 - Day 15: part 1', () => {
  Object.entries(exampleData).forEach(([exampleData, expected]) => {
    expect(part1(exampleData)).toBe(expected)
  })
  expect(part1(data)).toBe(1009)
})

test('2020 - Day 15: part 2', () => {
  // expect(part2('0,3,6')).toBe(175594)
  expect(part2(data)).toBe(62714)
})
