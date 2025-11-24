import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

test('2024 - Day 18: part 1', () => {
  expect(part1(exampleData)).toBe(22);
  expect(part1(data)).toBe(360);
});

test.skip('2024 - Day 18: part 2', () => {
  expect(part2(exampleData)).toBe('6,1');
  expect(part2(data)).toBe('18,62');
});
