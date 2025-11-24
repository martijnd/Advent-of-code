/**
 * Part 1: Calculate safety factor after 100 seconds
 * @param input - Robot positions and velocities
 * @returns Safety factor (product of quadrant robot counts)
 */
export function part1(input: string): number {
  const robots = parseInput(input);

  // Use different grid sizes for example vs real input
  const isExample = robots.length <= 12; // Example has 12 robots
  const width = isExample ? 11 : 101;
  const height = isExample ? 7 : 103;

  // Simulate 100 seconds
  for (const robot of robots) {
    robot.x = (robot.x + robot.vx * 100) % width;
    robot.y = (robot.y + robot.vy * 100) % height;

    // Handle negative modulo
    if (robot.x < 0) robot.x += width;
    if (robot.y < 0) robot.y += height;
  }

  return calculateSafetyFactor(robots, width, height);
}

/**
 * Part 2: Find when robots form a Christmas tree pattern
 * Look for a time when robots are not clustered together
 * @param input - Robot positions and velocities
 * @returns Seconds until Christmas tree appears
 */
export function part2(input: string): number {
  const robots = parseInput(input);
  const width = 101;
  const height = 103;

  // Reset robot positions
  for (const robot of robots) {
    robot.x = robot.initialX;
    robot.y = robot.initialY;
  }

  let seconds = 0;
  const maxSeconds = 10000; // Reasonable limit

  while (seconds < maxSeconds) {
    // Move robots
    for (const robot of robots) {
      robot.x = (robot.x + robot.vx) % width;
      robot.y = (robot.y + robot.vy) % height;

      if (robot.x < 0) robot.x += width;
      if (robot.y < 0) robot.y += height;
    }

    seconds++;

    // Check if robots form a tree pattern (low variance in positions)
    if (isChristmasTree(robots, width, height)) {
      return seconds;
    }
  }

  return -1; // Not found
}

/**
 * Parse input into robot objects
 * @param input - Raw input string
 * @returns Array of robot objects
 */
function parseInput(input: string): Robot[] {
  const robots: Robot[] = [];

  for (const line of input.trim().split('\n')) {
    const match = line.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/);
    if (match) {
      const x = parseInt(match[1]);
      const y = parseInt(match[2]);
      const vx = parseInt(match[3]);
      const vy = parseInt(match[4]);

      robots.push({
        x, y, vx, vy,
        initialX: x,
        initialY: y
      });
    }
  }

  return robots;
}

/**
 * Calculate safety factor from quadrant robot counts
 * @param robots - Robot positions
 * @param width - Grid width
 * @param height - Grid height
 * @returns Safety factor (product of quadrant counts)
 */
function calculateSafetyFactor(robots: Robot[], width: number, height: number): number {
  const quadrants = [0, 0, 0, 0]; // Q1, Q2, Q3, Q4

  for (const robot of robots) {
    // Skip robots in middle rows/columns
    if (robot.x === Math.floor(width / 2) || robot.y === Math.floor(height / 2)) {
      continue;
    }

    // Determine quadrant
    const midX = Math.floor(width / 2);
    const midY = Math.floor(height / 2);

    if (robot.x < midX && robot.y < midY) {
      quadrants[0]++; // Top-left
    } else if (robot.x > midX && robot.y < midY) {
      quadrants[1]++; // Top-right
    } else if (robot.x < midX && robot.y > midY) {
      quadrants[2]++; // Bottom-left
    } else if (robot.x > midX && robot.y > midY) {
      quadrants[3]++; // Bottom-right
    }
  }

  return quadrants.reduce((product, count) => product * count, 1);
}

/**
 * Check if robots form a Christmas tree pattern
 * Look for low variance (robots spread out, not clustered)
 * @param robots - Current robot positions
 * @param width - Grid width
 * @param height - Grid height
 * @returns True if Christmas tree pattern detected
 */
function isChristmasTree(robots: Robot[], width: number, height: number): boolean {
  // Create a set of occupied positions
  const positions = new Set<string>();
  for (const robot of robots) {
    positions.add(`${robot.x},${robot.y}`);
  }

  // Count unique positions (should be equal to robot count if no overlaps)
  return positions.size === robots.length;
}

interface Robot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  initialX: number;
  initialY: number;
}
