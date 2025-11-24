type Direction = '^' | '>' | 'v' | '<';

const DIRECTION_VECTORS: Record<Direction, [number, number]> = {
  '^': [-1, 0], // up
  '>': [0, 1], // right
  v: [1, 0], // down
  '<': [0, -1], // left
};

const TURN_RIGHT: Record<Direction, Direction> = {
  '^': '>',
  '>': 'v',
  v: '<',
  '<': '^',
};

export function part1(input: string) {
  const map = input.split('\n').map((line) => line.split(''));

  // Find guard's starting position and direction
  let guardRow = -1;
  let guardCol = -1;
  let direction: Direction = '^';

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const cell = map[row][col];
      if (cell === '^' || cell === '>' || cell === 'v' || cell === '<') {
        guardRow = row;
        guardCol = col;
        direction = cell as Direction;
        break;
      }
    }
    if (guardRow !== -1) break;
  }

  // Track visited positions
  const visited = new Set<string>();
  visited.add(`${guardRow},${guardCol}`);

  // Simulate guard movement
  while (true) {
    // Check what's in front of the guard
    const [dRow, dCol] = DIRECTION_VECTORS[direction];
    const nextRow = guardRow + dRow;
    const nextCol = guardCol + dCol;

    // Check if next position is out of bounds
    const isOutOfBounds =
      nextRow < 0 ||
      nextRow >= map.length ||
      nextCol < 0 ||
      nextCol >= map[nextRow].length;

    // Check if there's an obstacle in front (only if not out of bounds)
    const hasObstacle = !isOutOfBounds && map[nextRow][nextCol] === '#';

    if (hasObstacle) {
      // Turn right 90 degrees
      direction = TURN_RIGHT[direction];
    } else {
      // Move forward (even if out of bounds - this takes us off the map)
      guardRow = nextRow;
      guardCol = nextCol;

      // If we've moved off the map, we're done
      if (isOutOfBounds) {
        break;
      }

      // Mark this position as visited
      visited.add(`${guardRow},${guardCol}`);
    }
  }

  return visited.size;
}

function simulateGuardWithObstacle(
  map: string[][],
  startRow: number,
  startCol: number,
  startDirection: Direction,
  obstacleRow: number,
  obstacleCol: number
): boolean {
  // Create a copy of the map with the new obstacle
  const testMap = map.map((row) => [...row]);
  testMap[obstacleRow][obstacleCol] = '#';

  let guardRow = startRow;
  let guardCol = startCol;
  let direction = startDirection;

  // Track visited states: position + direction
  const visitedStates = new Set<string>();

  while (true) {
    const state = `${guardRow},${guardCol},${direction}`;
    if (visitedStates.has(state)) {
      // Loop detected!
      return true;
    }
    visitedStates.add(state);

    // Check what's in front of the guard
    const [dRow, dCol] = DIRECTION_VECTORS[direction];
    const nextRow = guardRow + dRow;
    const nextCol = guardCol + dCol;

    // Check if next position is out of bounds
    const isOutOfBounds =
      nextRow < 0 ||
      nextRow >= testMap.length ||
      nextCol < 0 ||
      nextCol >= testMap[nextRow].length;

    // Check if there's an obstacle in front (only if not out of bounds)
    const hasObstacle = !isOutOfBounds && testMap[nextRow][nextCol] === '#';

    if (hasObstacle) {
      // Turn right 90 degrees
      direction = TURN_RIGHT[direction];
    } else {
      // Move forward (even if out of bounds - this takes us off the map)
      guardRow = nextRow;
      guardCol = nextCol;

      // If we've moved off the map, no loop
      if (isOutOfBounds) {
        return false;
      }
    }
  }
}

export function part2(input: string) {
  const map = input.split('\n').map((line) => line.split(''));

  // Find guard's starting position and direction
  let startRow = -1;
  let startCol = -1;
  let startDirection: Direction = '^';

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const cell = map[row][col];
      if (cell === '^' || cell === '>' || cell === 'v' || cell === '<') {
        startRow = row;
        startCol = col;
        startDirection = cell as Direction;
        break;
      }
    }
    if (startRow !== -1) break;
  }

  let loopPositions = 0;

  // Try placing an obstacle at every empty position (not walls, not start)
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      // Skip if it's already an obstacle, the guard's start position, or out of bounds
      if (map[row][col] === '#' || (row === startRow && col === startCol)) {
        continue;
      }

      // Test if placing an obstacle here creates a loop
      if (
        simulateGuardWithObstacle(
          map,
          startRow,
          startCol,
          startDirection,
          row,
          col
        )
      ) {
        loopPositions++;
      }
    }
  }

  return loopPositions;
}
