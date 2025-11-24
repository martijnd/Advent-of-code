import { getInput } from '../../utils/getInput';
import { part1 } from './index';

const data = getInput(__dirname);

const exampleData = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

test('2024 - Day 6: part 1', () => {
  expect(part1(exampleData)).toBe(41);
  expect(part1(data)).toBe(4883);
});
