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

export function part2(input: string) {}
