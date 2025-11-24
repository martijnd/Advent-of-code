/**
 * Part 1: Count stones after 25 transformations
 * @param input - Initial stone arrangement
 * @returns Number of stones after 25 blinks
 */
export function part1(input: string): number {
  const stones = input.trim().split(' ').map(Number);
  return simulateBlinks(stones, 25);
}

/**
 * Part 2: Count stones after 75 transformations
 * @param input - Initial stone arrangement
 * @returns Number of stones after 75 blinks
 */
export function part2(input: string): number {
  const stones = input.trim().split(' ').map(Number);
  return simulateBlinks(stones, 75);
}

/**
 * Simulate stone transformations using memoization for efficiency
 * @param initialStones - Starting stone arrangement
 * @param blinks - Number of transformation cycles
 * @returns Total number of stones after transformations
 */
function simulateBlinks(initialStones: number[], blinks: number): number {
  // Use a map to count stone frequencies instead of tracking individual stones
  const stoneCounts = new Map<number, number>();

  // Initialize counts
  for (const stone of initialStones) {
    stoneCounts.set(stone, (stoneCounts.get(stone) || 0) + 1);
  }

  // Memoization cache: stone value -> blink count -> resulting stone counts
  const memo = new Map<string, Map<number, number>>();

  for (let blink = 0; blink < blinks; blink++) {
    const newStoneCounts = new Map<number, number>();

    for (const [stone, count] of stoneCounts) {
      const transformations = getTransformations(stone, memo);

      for (const newStone of transformations) {
        newStoneCounts.set(newStone, (newStoneCounts.get(newStone) || 0) + count);
      }
    }

    stoneCounts.clear();
    for (const [stone, count] of newStoneCounts) {
      stoneCounts.set(stone, count);
    }
  }

  // Sum all counts
  let total = 0;
  for (const count of stoneCounts.values()) {
    total += count;
  }
  return total;
}

/**
 * Get the stones that result from transforming a single stone
 * @param stone - Stone value to transform
 * @param memo - Memoization cache
 * @returns Array of resulting stone values
 */
function getTransformations(stone: number, memo: Map<string, Map<number, number>>): number[] {
  // Rule 1: If stone is 0, replace with 1
  if (stone === 0) {
    return [1];
  }

  // Rule 2: If stone has even number of digits, split into two stones
  const stoneStr = stone.toString();
  if (stoneStr.length % 2 === 0) {
    const mid = stoneStr.length / 2;
    const left = parseInt(stoneStr.slice(0, mid));
    const right = parseInt(stoneStr.slice(mid));
    return [left, right];
  }

  // Rule 3: Multiply by 2024
  return [stone * 2024];
}
