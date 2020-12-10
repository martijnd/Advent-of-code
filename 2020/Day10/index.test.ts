import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData2 = `16
10
15
5
1
11
7
19
6
12
4`

const exampleData = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`

test('2020 - Day 10: part 1', () => {
  expect(part1(exampleData2)).toBe(7 * 5)
  expect(part1(exampleData)).toBe(22 * 10)
  expect(part1(data)).toBe(2775)
})

// test('2020 - Day 10: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe()
// })
