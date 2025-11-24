import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const exampleData2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

const exampleData3 = `R 12
D 12
`;

test('2022 - Day 9: part 1', () => {
  expect(part1(exampleData)).toBe(13);
  expect(part1(data)).toBe(6642);
});

test.skip('2022 - Day 9: part 2', () => {
  expect(part2(exampleData3)).toBe(36);
  // expect(part2(data)).toBe(undefined)
});
