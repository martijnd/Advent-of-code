import { getInput } from '../../utils/getInput';
import { part1, part2 } from './index';

const data = getInput(__dirname);

test('2024 - Day 24: part 1', () => {
  expect(part1(data)).toBe(55544677167336);
});

test('2024 - Day 24: part 2', () => {
  expect(part2(data)).toBe('cdj,dhm,gfm,qjd,z08,z16,z32,z45');
});
