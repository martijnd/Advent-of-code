export function part1(input: string) {
  const grid = input.split('\n').map((x) => x.split(''));
  let total = 0;
  const colLength = grid[0].length;
  for (let row = 1; row < grid.length; row++) {
    for (let col = 0; col < colLength; col++) {
      if (['|', 'S'].includes(grid[row - 1][col]) && grid[row][col] !== '^') {
        grid[row][col] = '|';
      }

      if (grid[row][col] === '^' && grid[row - 1][col] === '|') {
        grid[row][col - 1] = '|';
        grid[row][col + 1] = '|';
        total++;
      }
    }
  }

  return total;
}

const memo = new Map<string, number>();
export function part2(input: string) {
  const grid = input.split('\n').map((x) => x.split(''));
  const startCol = grid[0].findIndex((x) => x === 'S')!;

  return traverse(grid, 1, startCol);
}

function traverse(grid: string[][], row: number, col: number): number {
  const key = `${row},${col}`;
  if (memo.has(key)) {
    return memo.get(key)!;
  }

  // exit
  if (row === grid.length - 1) {
    return 1;
  }

  const currentPosition = grid[row][col];
  let ways = 0;

  if (currentPosition === '^') {
    // branch left and right
    ways += traverse(grid, row, col - 1);
    ways += traverse(grid, row, col + 1);
  } else if (currentPosition === '.') {
    // continue down
    ways += traverse(grid, row + 1, col);
  }

  memo.set(key, ways);
  return ways;
}
