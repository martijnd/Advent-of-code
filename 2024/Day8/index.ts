/**
 * Part 1: Find antinodes created by antenna pairs
 * Antinodes appear at points twice as far from one antenna as from another
 * @param input - Grid of antennas
 * @returns Number of unique antinode locations
 */
export function part1(input: string): number {
  const grid = input
    .trim()
    .split('\n')
    .map((line) => line.split(''));
  const antennas = findAntennas(grid);
  const antinodes = new Set<string>();

  // For each frequency, find all pairs and calculate antinodes
  for (const positions of Object.values(antennas)) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const [pos1, pos2] = [positions[i], positions[j]];
        const antinodePositions = calculateAntinodes(
          pos1,
          pos2,
          grid.length,
          grid[0].length
        );

        antinodePositions.forEach(([row, col]) => {
          antinodes.add(`${row},${col}`);
        });
      }
    }
  }

  return antinodes.size;
}

/**
 * Part 2: Find all antinodes including those in line with antennas
 * Antinodes appear at any point along the line formed by two antennas
 * @param input - Grid of antennas
 * @returns Number of unique antinode locations
 */
export function part2(input: string): number {
  const grid = input
    .trim()
    .split('\n')
    .map((line) => line.split(''));
  const antennas = findAntennas(grid);
  const antinodes = new Set<string>();

  // For each frequency, find all pairs and calculate all antinodes along the line
  for (const positions of Object.values(antennas)) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const [pos1, pos2] = [positions[i], positions[j]];
        const antinodePositions = calculateAllAntinodes(
          pos1,
          pos2,
          grid.length,
          grid[0].length
        );

        antinodePositions.forEach(([row, col]) => {
          antinodes.add(`${row},${col}`);
        });
      }
    }
  }

  return antinodes.size;
}

/**
 * Find all antennas grouped by frequency
 * @param grid - 2D grid of characters
 * @returns Map of frequency to array of [row, col] positions
 */
function findAntennas(grid: string[][]): Record<string, [number, number][]> {
  const antennas: Record<string, [number, number][]> = {};

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const char = grid[row][col];
      if (char !== '.') {
        if (!antennas[char]) {
          antennas[char] = [];
        }
        antennas[char].push([row, col]);
      }
    }
  }

  return antennas;
}

/**
 * Calculate antinode positions for two antennas (Part 1)
 * Antinodes appear at 2x distance from one antenna in the direction away from the other
 * @param pos1 - First antenna position [row, col]
 * @param pos2 - Second antenna position [row, col]
 * @param maxRow - Grid height
 * @param maxCol - Grid width
 * @returns Array of valid antinode positions
 */
function calculateAntinodes(
  pos1: [number, number],
  pos2: [number, number],
  maxRow: number,
  maxCol: number
): [number, number][] {
  const [r1, c1] = pos1;
  const [r2, c2] = pos2;

  // Calculate differences
  const dr = r2 - r1;
  const dc = c2 - c1;

  const antinodes: [number, number][] = [];

  // Antinode 1: extend from pos1 away from pos2
  const antinode1Row = r1 - dr;
  const antinode1Col = c1 - dc;
  if (
    antinode1Row >= 0 &&
    antinode1Row < maxRow &&
    antinode1Col >= 0 &&
    antinode1Col < maxCol
  ) {
    antinodes.push([antinode1Row, antinode1Col]);
  }

  // Antinode 2: extend from pos2 away from pos1
  const antinode2Row = r2 + dr;
  const antinode2Col = c2 + dc;
  if (
    antinode2Row >= 0 &&
    antinode2Row < maxRow &&
    antinode2Col >= 0 &&
    antinode2Col < maxCol
  ) {
    antinodes.push([antinode2Row, antinode2Col]);
  }

  return antinodes;
}

/**
 * Calculate all antinode positions along the line formed by two antennas (Part 2)
 * @param pos1 - First antenna position [row, col]
 * @param pos2 - Second antenna position [row, col]
 * @param maxRow - Grid height
 * @param maxCol - Grid width
 * @returns Array of all valid antinode positions including antenna positions
 */
function calculateAllAntinodes(
  pos1: [number, number],
  pos2: [number, number],
  maxRow: number,
  maxCol: number
): [number, number][] {
  const [r1, c1] = pos1;
  const [r2, c2] = pos2;

  // Calculate differences and greatest common divisor for step size
  const dr = r2 - r1;
  const dc = c2 - c1;
  const gcd = Math.abs(getGCD(dr, dc));

  // Normalize the direction vector
  const stepR = dr / gcd;
  const stepC = dc / gcd;

  const antinodes: [number, number][] = [];

  // Start from pos1 and move in both directions along the line
  let currentR = r1;
  let currentC = c1;

  // Move backwards from pos1
  while (
    currentR >= 0 &&
    currentR < maxRow &&
    currentC >= 0 &&
    currentC < maxCol
  ) {
    antinodes.push([currentR, currentC]);
    currentR -= stepR;
    currentC -= stepC;
  }

  // Reset to pos1 and move forwards
  currentR = r1 + stepR;
  currentC = c1 + stepC;

  while (
    currentR >= 0 &&
    currentR < maxRow &&
    currentC >= 0 &&
    currentC < maxCol
  ) {
    antinodes.push([currentR, currentC]);
    currentR += stepR;
    currentC += stepC;
  }

  return antinodes;
}

/**
 * Calculate greatest common divisor using Euclidean algorithm
 * @param a - First number
 * @param b - Second number
 * @returns GCD of a and b
 */
function getGCD(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
