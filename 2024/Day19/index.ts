/**
 * Part 1: Count designs that can be made with available patterns
 * @param input - Available patterns and desired designs
 * @returns Number of possible designs
 */
export function part1(input: string): number {
  const [patternsSection, designsSection] = input.trim().split('\n\n');
  const patterns = patternsSection.split(', ').map(p => p.trim());
  const designs = designsSection.split('\n');

  let possibleCount = 0;

  for (const design of designs) {
    if (canMakeDesign(design, patterns)) {
      possibleCount++;
    }
  }

  return possibleCount;
}

/**
 * Part 2: Count total number of ways to make each design
 * @param input - Available patterns and desired designs
 * @returns Sum of ways for all designs
 */
export function part2(input: string): number {
  const [patternsSection, designsSection] = input.trim().split('\n\n');
  const patterns = patternsSection.split(', ').map(p => p.trim());
  const designs = designsSection.split('\n');

  let totalWays = 0;

  for (const design of designs) {
    totalWays += countWaysToMakeDesign(design, patterns);
  }

  return totalWays;
}

/**
 * Check if a design can be made with available patterns
 * @param design - Target design string
 * @param patterns - Available pattern strings
 * @returns True if design can be made
 */
function canMakeDesign(design: string, patterns: string[]): boolean {
  const memo = new Map<number, boolean>();

  function canMakeFrom(index: number): boolean {
    if (index === design.length) {
      return true;
    }

    if (memo.has(index)) {
      return memo.get(index)!;
    }

    for (const pattern of patterns) {
      if (design.startsWith(pattern, index)) {
        if (canMakeFrom(index + pattern.length)) {
          memo.set(index, true);
          return true;
        }
      }
    }

    memo.set(index, false);
    return false;
  }

  return canMakeFrom(0);
}

/**
 * Count ways to make a design with available patterns
 * @param design - Target design string
 * @param patterns - Available pattern strings
 * @returns Number of ways to make the design
 */
function countWaysToMakeDesign(design: string, patterns: string[]): number {
  const memo = new Map<number, number>();

  function countWaysFrom(index: number): number {
    if (index === design.length) {
      return 1;
    }

    if (memo.has(index)) {
      return memo.get(index)!;
    }

    let ways = 0;

    for (const pattern of patterns) {
      if (design.startsWith(pattern, index)) {
        ways += countWaysFrom(index + pattern.length);
      }
    }

    memo.set(index, ways);
    return ways;
  }

  return countWaysFrom(0);
}
