/**
 * Part 1: Find minimum tokens to win all possible prizes
 * @param input - Claw machine configurations
 * @returns Minimum tokens spent
 */
export function part1(input: string): number {
  const machines = parseInput(input);
  let totalTokens = 0;

  for (const machine of machines) {
    const solution = solveMachine(machine);
    if (solution) {
      const { a, b } = solution;
      totalTokens += 3 * a + b;
    }
  }

  return totalTokens;
}

/**
 * Part 2: Prize coordinates increased by 10000000000000
 * @param input - Claw machine configurations
 * @returns Minimum tokens spent with increased prize coordinates
 */
export function part2(input: string): number {
  const machines = parseInput(input);
  let totalTokens = 0;

  for (const machine of machines) {
    // Add 10000000000000 to prize coordinates
    const adjustedMachine = {
      ...machine,
      prizeX: machine.prizeX + 10000000000000,
      prizeY: machine.prizeY + 10000000000000
    };

    const solution = solveMachine(adjustedMachine);
    if (solution) {
      const { a, b } = solution;
      totalTokens += 3 * a + b;
    }
  }

  return totalTokens;
}

/**
 * Parse input into machine configurations
 * @param input - Raw input string
 * @returns Array of machine configurations
 */
function parseInput(input: string): Machine[] {
  const sections = input.trim().split('\n\n');
  const machines: Machine[] = [];

  for (const section of sections) {
    const lines = section.split('\n');

    // Parse Button A
    const aMatch = lines[0].match(/Button A: X\+(\d+), Y\+(\d+)/);
    const aX = parseInt(aMatch![1]);
    const aY = parseInt(aMatch![2]);

    // Parse Button B
    const bMatch = lines[1].match(/Button B: X\+(\d+), Y\+(\d+)/);
    const bX = parseInt(bMatch![1]);
    const bY = parseInt(bMatch![2]);

    // Parse Prize
    const prizeMatch = lines[2].match(/Prize: X=(\d+), Y=(\d+)/);
    const prizeX = parseInt(prizeMatch![1]);
    const prizeY = parseInt(prizeMatch![2]);

    machines.push({
      aX, aY, bX, bY, prizeX, prizeY
    });
  }

  return machines;
}

/**
 * Solve a claw machine using Cramer's rule or linear algebra
 * We need to solve: aX*a + bX*b = prizeX
 *                   aY*a + bY*b = prizeY
 * @param machine - Machine configuration
 * @returns Solution with a and b values, or null if no solution
 */
function solveMachine(machine: Machine): { a: number; b: number } | null {
  const { aX, aY, bX, bY, prizeX, prizeY } = machine;

  // Use Cramer's rule to solve the system
  // aX*a + bX*b = prizeX
  // aY*a + bY*b = prizeY

  const determinant = aX * bY - aY * bX;

  if (determinant === 0) {
    // System has no unique solution
    return null;
  }

  // Calculate a and b
  const a = (prizeX * bY - prizeY * bX) / determinant;
  const b = (aX * prizeY - aY * prizeX) / determinant;

  // Check if a and b are integers (within floating point precision)
  const epsilon = 1e-6;
  const aRounded = Math.round(a);
  const bRounded = Math.round(b);

  if (
    Math.abs(a - aRounded) > epsilon ||
    Math.abs(b - bRounded) > epsilon ||
    aRounded < 0 ||
    bRounded < 0
  ) {
    return null;
  }

  return { a: aRounded, b: bRounded };
}

interface Machine {
  aX: number;
  aY: number;
  bX: number;
  bY: number;
  prizeX: number;
  prizeY: number;
}
