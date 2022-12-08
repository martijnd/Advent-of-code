export function part1(input: string) {
  const grid = input.split('\n').map((row) => row.split('').map(Number));

  let visibleCount = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const current = grid[row][col];
      // Check edges
      if (
        row === 0 ||
        col === 0 ||
        row === grid.length - 1 ||
        col === grid[0].length - 1
      ) {
        visibleCount++;
        continue;
      }

      let visibleTop = true;
      // Check above
      for (let i = row - 1; i >= 0; i--) {
        if (grid[i][col] >= current) {
          visibleTop = false;
        }
      }

      let visibleBottom = true;
      // Check bottom
      for (let i = row + 1; i < grid.length; i++) {
        if (grid[i][col] >= current) {
          visibleBottom = false;
        }
      }

      let visibleLeft = true;
      // Check left
      for (let i = col - 1; i >= 0; i--) {
        if (grid[row][i] >= current) {
          visibleLeft = false;
        }
      }

      let visibleRight = true;
      // Check left
      for (let i = col + 1; i < grid[0].length; i++) {
        if (grid[row][i] >= current) {
          visibleRight = false;
        }
      }

      if (visibleTop || visibleBottom || visibleLeft || visibleRight) {
        visibleCount++;
      }
    }
  }

  return visibleCount;
}

export function part2(input: string) {
  const grid = input.split('\n').map((row) => row.split('').map(Number));

  let scenicScores: number[] = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const current = grid[row][col];
      // Check edges
      if (
        row === 0 ||
        col === 0 ||
        row === grid.length - 1 ||
        col === grid[0].length - 1
      ) {
        continue;
      }

      let scoreTop = 0;
      // Check above
      for (let i = row - 1; i >= 0; i--) {
        scoreTop++;
        if (grid[i][col] >= current) {
          break;
        }
      }

      let scoreBottom = 0;
      // Check bottom
      for (let i = row + 1; i < grid.length; i++) {
        scoreBottom++;
        if (grid[i][col] >= current) {
          break;
        }
      }

      let scoreLeft = 0;
      // Check left
      for (let i = col - 1; i >= 0; i--) {
        scoreLeft++;
        if (grid[row][i] >= current) {
          break;
        }
      }

      let scoreRight = 0;
      // Check left
      for (let i = col + 1; i < grid[0].length; i++) {
        scoreRight++;
        if (grid[row][i] >= current) {
          break;
        }
      }

      scenicScores.push(scoreTop * scoreBottom * scoreLeft * scoreRight);
    }
  }
  return Math.max(...scenicScores);
}
