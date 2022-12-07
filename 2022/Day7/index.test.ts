import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

const exampleData = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

test('2022 - Day 7: part 1', () => {
  expect(part1(exampleData)).toBe(95437);
  // expect(part1(data)).toBe(undefined)
});

// test('2022 - Day 7: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe(undefined)
// })
