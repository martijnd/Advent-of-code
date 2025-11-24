/**
 * Part 1: Find shortest path after bytes have fallen
 * @param input - List of falling byte coordinates
 * @returns Minimum steps to reach exit
 */
export function part1(input: string): number {
  const bytes = parseInput(input);
  const isExample = bytes.length <= 25; // Example has 25 bytes
  const gridSize = isExample ? 7 : 71;
  const bytesToSimulate = isExample ? 12 : 1024;

  const corrupted = new Set<string>();

  // Simulate bytes
  for (let i = 0; i < Math.min(bytesToSimulate, bytes.length); i++) {
    const [x, y] = bytes[i];
    corrupted.add(`${x},${y}`);
  }

  return findShortestPath(corrupted, gridSize, gridSize);
}

/**
 * Part 2: Find the first byte that blocks the path
 * @param input - List of falling byte coordinates
 * @returns Coordinates of the blocking byte
 */
export function part2(input: string): string {
  const bytes = parseInput(input);
  const gridSize = 71;
  const corrupted = new Set<string>();

  // Start with no corrupted bytes
  let pathExists = true;

  for (const byte of bytes) {
    const [x, y] = byte;
    corrupted.add(`${x},${y}`);

    // Check if path still exists
    const pathLength = findShortestPath(corrupted, gridSize, gridSize);
    if (pathLength === -1) {
      return `${x},${y}`;
    }
  }

  return "No blocking byte found";
}

/**
 * Parse input into array of [x,y] coordinates
 * @param input - Raw input string
 * @returns Array of [x,y] coordinates
 */
function parseInput(input: string): number[][] {
  return input.trim().split('\n').map(line => {
    const [x, y] = line.split(',').map(Number);
    return [x, y];
  });
}

/**
 * Find shortest path from (0,0) to (width-1,height-1) avoiding corrupted cells
 * @param corrupted - Set of corrupted cell coordinates
 * @param width - Grid width
 * @param height - Grid height
 * @returns Shortest path length or -1 if no path exists
 */
function findShortestPath(corrupted: Set<string>, width: number, height: number): number {
  const start = [0, 0];
  const end = [width - 1, height - 1];

  // BFS queue: [x, y, steps]
  const queue: number[][] = [[start[0], start[1], 0]];
  const visited = new Set<string>();
  visited.add(`${start[0]},${start[1]}`);

  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0] // right, down, left, up
  ];

  while (queue.length > 0) {
    const [x, y, steps] = queue.shift()!;

    if (x === end[0] && y === end[1]) {
      return steps;
    }

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      const key = `${newX},${newY}`;

      if (
        newX >= 0 && newX < width &&
        newY >= 0 && newY < height &&
        !corrupted.has(key) &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push([newX, newY, steps + 1]);
      }
    }
  }

  return -1; // No path found
}
