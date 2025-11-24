/**
 * Part 1: Find sum of trailhead scores (unique 9s reachable from each 0)
 * @param input - Grid of heights 0-9
 * @returns Sum of trailhead scores
 */
export function part1(input: string): number {
  const grid = input.trim().split('\n').map(line => line.split('').map(Number));
  const trailheads = findTrailheads(grid);

  let totalScore = 0;

  for (const [row, col] of trailheads) {
    const reachableNines = findReachableNines(grid, row, col);
    totalScore += reachableNines.size;
  }

  return totalScore;
}

/**
 * Part 2: Find sum of trailhead ratings (total paths from each 0 to 9s)
 * @param input - Grid of heights 0-9
 * @returns Sum of trailhead ratings
 */
export function part2(input: string): number {
  const grid = input.trim().split('\n').map(line => line.split('').map(Number));
  const trailheads = findTrailheads(grid);

  let totalRating = 0;

  for (const [row, col] of trailheads) {
    const rating = countPathsToNine(grid, row, col);
    totalRating += rating;
  }

  return totalRating;
}

/**
 * Find all trailhead positions (cells with value 0)
 * @param grid - Height grid
 * @returns Array of [row, col] trailhead positions
 */
function findTrailheads(grid: number[][]): [number, number][] {
  const trailheads: [number, number][] = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 0) {
        trailheads.push([row, col]);
      }
    }
  }

  return trailheads;
}

/**
 * Find all unique 9s reachable from a trailhead using DFS
 * @param grid - Height grid
 * @param startRow - Starting row
 * @param startCol - Starting column
 * @returns Set of reachable 9 positions as "row,col" strings
 */
function findReachableNines(grid: number[][], startRow: number, startCol: number): Set<string> {
  const visited = new Set<string>();
  const reachableNines = new Set<string>();
  const stack: [number, number, number][] = [[startRow, startCol, 0]]; // [row, col, currentHeight]

  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1] // up, down, left, right
  ];

  while (stack.length > 0) {
    const [row, col, height] = stack.pop()!;

    if (height === 9) {
      reachableNines.add(`${row},${col}`);
      continue;
    }

    // Try all directions
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (
        newRow >= 0 && newRow < grid.length &&
        newCol >= 0 && newCol < grid[newRow].length &&
        grid[newRow][newCol] === height + 1 &&
        !visited.has(`${newRow},${newCol}`)
      ) {
        visited.add(`${newRow},${newCol}`);
        stack.push([newRow, newCol, height + 1]);
      }
    }
  }

  return reachableNines;
}

/**
 * Count total number of distinct paths from trailhead to any 9
 * @param grid - Height grid
 * @param startRow - Starting row
 * @param startCol - Starting column
 * @returns Number of distinct paths to any 9
 */
function countPathsToNine(grid: number[][], startRow: number, startCol: number): number {
  const memo = new Map<string, number>();

  function dfs(row: number, col: number, height: number): number {
    const key = `${row},${col},${height}`;

    if (memo.has(key)) {
      return memo.get(key)!;
    }

    if (height === 9) {
      return 1;
    }

    let paths = 0;
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1] // up, down, left, right
    ];

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (
        newRow >= 0 && newRow < grid.length &&
        newCol >= 0 && newCol < grid[newRow].length &&
        grid[newRow][newCol] === height + 1
      ) {
        paths += dfs(newRow, newCol, height + 1);
      }
    }

    memo.set(key, paths);
    return paths;
  }

  return dfs(startRow, startCol, 0);
}
