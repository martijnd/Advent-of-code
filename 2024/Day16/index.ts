/**
 * Part 1: Find lowest score path from S to E
 * @param input - Maze layout
 * @returns Lowest score to reach E
 */
export function part1(input: string): number {
  const maze = input.trim().split('\n').map(line => line.split(''));
  const start = findPosition(maze, 'S');
  const end = findPosition(maze, 'E');

  if (!start || !end) return 0;

  return dijkstra(maze, start, end);
}

/**
 * Part 2: Count tiles on optimal paths
 * @param input - Maze layout
 * @returns Number of tiles on at least one optimal path
 */
export function part2(input: string): number {
  const maze = input.trim().split('\n').map(line => line.split(''));
  const start = findPosition(maze, 'S');
  const end = findPosition(maze, 'E');

  if (!start || !end) return 0;

  return countOptimalTiles(maze, start, end);
}

/**
 * Compute distance matrix for all states
 * @param maze - 2D maze array
 * @param start - Starting position [row, col]
 * @returns Distance matrix [row][col][direction]
 */
function computeDistances(maze: string[][], start: [number, number]): number[][][] {
  const directions = [
    [0, 1],   // East (right)
    [1, 0],   // South (down)
    [0, -1],  // West (left)
    [-1, 0]   // North (up)
  ];

  const dist: number[][][] = Array(maze.length).fill().map(() =>
    Array(maze[0].length).fill().map(() => Array(4).fill(Infinity))
  );

  const pq: Array<[number, number, number, number]> = []; // [score, row, col, dir]

  // Start facing East (direction 0)
  dist[start[0]][start[1]][0] = 0;
  pq.push([0, start[0], start[1], 0]);

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [score, row, col, dir] = pq.shift()!;

    if (score > dist[row][col][dir]) continue;

    // Move forward
    const [dr, dc] = directions[dir];
    const newRow = row + dr;
    const newCol = col + dc;

    if (
      newRow >= 0 && newRow < maze.length &&
      newCol >= 0 && newCol < maze[0].length &&
      maze[newRow][newCol] !== '#'
    ) {
      const newScore = score + 1;
      if (newScore < dist[newRow][newCol][dir]) {
        dist[newRow][newCol][dir] = newScore;
        pq.push([newScore, newRow, newCol, dir]);
      }
    }

    // Turn left and right
    for (const turn of [-1, 1]) {
      const newDir = (dir + turn + 4) % 4;
      const newScore = score + 1000;

      if (newScore < dist[row][col][newDir]) {
        dist[row][col][newDir] = newScore;
        pq.push([newScore, row, col, newDir]);
      }
    }
  }

  return dist;
}

/**
 * Find position of a specific character in the maze
 * @param maze - 2D maze array
 * @param char - Character to find
 * @returns Position [row, col] or null if not found
 */
function findPosition(maze: string[][], char: string): [number, number] | null {
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (maze[row][col] === char) {
        return [row, col];
      }
    }
  }
  return null;
}

/**
 * Dijkstra's algorithm for maze with direction state
 * @param maze - 2D maze array
 * @param start - Starting position [row, col]
 * @param end - Ending position [row, col]
 * @returns Lowest score to reach end
 */
function dijkstra(maze: string[][], start: [number, number], end: [number, number]): number {
  const directions = [
    [0, 1],   // East (right)
    [1, 0],   // South (down)
    [0, -1],  // West (left)
    [-1, 0]   // North (up)
  ];

  // Priority queue: [score, row, col, direction]
  const pq: Array<[number, number, number, number]> = [];

  // Distance to each state [row, col, direction]
  const dist: number[][][] = Array(maze.length).fill().map(() =>
    Array(maze[0].length).fill().map(() => Array(4).fill(Infinity))
  );

  // Start facing East (direction 0)
  dist[start[0]][start[1]][0] = 0;
  pq.push([0, start[0], start[1], 0]);

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]); // Simple priority queue
    const [score, row, col, dir] = pq.shift()!;

    if (score > dist[row][col][dir]) continue;

    // Try moving forward
    const [dr, dc] = directions[dir];
    const newRow = row + dr;
    const newCol = col + dc;

    if (
      newRow >= 0 && newRow < maze.length &&
      newCol >= 0 && newCol < maze[0].length &&
      maze[newRow][newCol] !== '#'
    ) {
      const newScore = score + 1;
      if (newScore < dist[newRow][newCol][dir]) {
        dist[newRow][newCol][dir] = newScore;
        pq.push([newScore, newRow, newCol, dir]);
      }
    }

    // Try turning left and right
    for (const turn of [-1, 1]) {
      const newDir = (dir + turn + 4) % 4;
      const newScore = score + 1000;

      if (newScore < dist[row][col][newDir]) {
        dist[row][col][newDir] = newScore;
        pq.push([newScore, row, col, newDir]);
      }
    }
  }

  // Find minimum score to reach end in any direction
  return Math.min(...dist[end[0]][end[1]]);
}

/**
 * Count tiles that are part of at least one optimal path
 * @param maze - 2D maze array
 * @param start - Starting position [row, col]
 * @param end - Ending position [row, col]
 * @returns Number of tiles on optimal paths
 */
function countOptimalTiles(maze: string[][], start: [number, number], end: [number, number]): number {
  // Compute distances from start
  const dist = computeDistances(maze, start);

  // Find minimum score to reach end
  const minScore = Math.min(...dist[end[0]][end[1]]);

  // Work backwards from end to find all optimal paths
  const optimalTiles = new Set<string>();
  const visited = new Set<string>();

  function explore(row: number, col: number, dir: number, score: number): void {
    const stateKey = `${row},${col},${dir}`;
    if (visited.has(stateKey)) return;
    visited.add(stateKey);

    optimalTiles.add(`${row},${col}`);

    // Could come from moving backward
    const directions = [
      [0, 1],   // East (right)
      [1, 0],   // South (down)
      [0, -1],  // West (left)
      [-1, 0]   // North (up)
    ];

    const [dr, dc] = directions[dir];
    const prevRow = row - dr;
    const prevCol = col - dc;

    // Check if we could have moved forward to this position
    if (
      prevRow >= 0 && prevRow < maze.length &&
      prevCol >= 0 && prevCol < maze[0].length &&
      maze[prevRow][prevCol] !== '#' &&
      dist[prevRow][prevCol][dir] + 1 === score
    ) {
      explore(prevRow, prevCol, dir, score - 1);
    }

    // Could come from turning at this position
    for (const turn of [-1, 1]) {
      const prevDir = (dir - turn + 4) % 4;
      if (dist[row][col][prevDir] + 1000 === score) {
        explore(row, col, prevDir, score - 1000);
      }
    }
  }

  // Start from all optimal end states
  for (let dir = 0; dir < 4; dir++) {
    if (dist[end[0]][end[1]][dir] === minScore) {
      explore(end[0], end[1], dir, minScore);
    }
  }

  return optimalTiles.size;
}
