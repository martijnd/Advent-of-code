import { partOne, partTwo } from './main';

import { test, expect } from 'vitest';

const testInput = [
  'abcdef',
  'bababc',
  'abbcde',
  'abcccd',
  'aabcdd',
  'abcdee',
  'ababab',
];

const testInput2 = [
  'abcde',
  'fghij',
  'klmno',
  'pqrst',
  'fguij',
  'axcye',
  'wvxyz',
];

test('should return the correct checksum', () => {
  expect(partOne(testInput)).toBe(12);
});

test('should return the most matching string with the same characters', () => {
  // expect(partTwo(testInput2)).toBe('fgij')
});
