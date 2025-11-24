/**
 * Part 1: Count lock/key pairs that fit together
 * Each lock and key has 5 columns of pins, we need to find pairs where no pins overlap
 * @param input - Schematic of locks and keys
 * @returns Number of fitting lock/key pairs
 */
export function part1(input: string): number {
  const schematics = input.trim().split('\n\n');
  const locks: number[][] = [];
  const keys: number[][] = [];

  // Parse each schematic
  for (const schematic of schematics) {
    const lines = schematic.split('\n');
    const isLock = lines[0] === '#####';

    // Calculate pin heights for each of the 5 columns
    const pinHeights: number[] = [];
    for (let col = 0; col < 5; col++) {
      let height = 0;
      for (let row = 0; row < lines.length; row++) {
        if (lines[row][col] === '#') {
          height++;
        }
      }
      pinHeights.push(height);
    }

    if (isLock) {
      locks.push(pinHeights);
    } else {
      keys.push(pinHeights);
    }
  }

  // Count fitting pairs
  let fittingPairs = 0;
  for (const lock of locks) {
    for (const key of keys) {
      // Check if any column has overlapping pins (lock + key > 7 for 7-row schematics)
      const fits = lock.every((lockPin, col) => lockPin + key[col] <= 7);
      if (fits) {
        fittingPairs++;
      }
    }
  }

  return fittingPairs;
}

/**
 * Part 2: There is no part 2 for Day 25!
 * Advent of Code 2024 is complete! 🎄
 */
export function part2(input: string): number {
  return 0; // No part 2 for the final day!
}
