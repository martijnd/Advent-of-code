/**
 * Part 1: Simulate robot movements and calculate GPS sum
 * @param input - Warehouse map and movement instructions
 * @returns Sum of GPS coordinates of all boxes
 */
export function part1(input: string): number {
  const [mapSection, movesSection] = input.trim().split('\n\n');
  const map = mapSection.split('\n').map(line => line.split(''));
  const moves = movesSection.replace(/\n/g, '').split('');

  // Find robot position
  let robotRow = -1;
  let robotCol = -1;

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === '@') {
        robotRow = row;
        robotCol = col;
        break;
      }
    }
    if (robotRow !== -1) break;
  }

  // Process each move
  for (const move of moves) {
    const [dRow, dCol] = getDirection(move);
    const newRow = robotRow + dRow;
    const newCol = robotCol + dCol;

    if (map[newRow][newCol] === '#') {
      // Wall, can't move
      continue;
    }

    if (map[newRow][newCol] === '.') {
      // Empty space, move robot
      map[robotRow][robotCol] = '.';
      map[newRow][newCol] = '@';
      robotRow = newRow;
      robotCol = newCol;
    } else if (map[newRow][newCol] === 'O') {
      // Try to push box(es)
      if (tryPushBoxes(map, newRow, newCol, dRow, dCol)) {
        // Successfully pushed, move robot
        map[robotRow][robotCol] = '.';
        map[newRow][newCol] = '@';
        robotRow = newRow;
        robotCol = newCol;
      }
    }
  }

  return calculateGPS(map);
}

/**
 * Part 2: Double-width warehouse with wide boxes
 * @param input - Warehouse map and movement instructions
 * @returns Sum of GPS coordinates of all boxes
 */
export function part2(input: string): number {
  const [mapSection, movesSection] = input.trim().split('\n\n');
  const originalMap = mapSection.split('\n').map(line => line.split(''));
  const moves = movesSection.replace(/\n/g, '').split('');

  // Expand map horizontally
  const map: string[][] = [];
  for (const row of originalMap) {
    const newRow: string[] = [];
    for (const cell of row) {
      if (cell === '#') {
        newRow.push('#', '#');
      } else if (cell === 'O') {
        newRow.push('[', ']');
      } else if (cell === '.') {
        newRow.push('.', '.');
      } else if (cell === '@') {
        newRow.push('@', '.');
      }
    }
    map.push(newRow);
  }

  // Find robot position
  let robotRow = -1;
  let robotCol = -1;

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === '@') {
        robotRow = row;
        robotCol = col;
        break;
      }
    }
    if (robotRow !== -1) break;
  }

  // Process each move
  for (const move of moves) {
    const [dRow, dCol] = getDirection(move);

    if (tryMoveWide(map, robotRow, robotCol, dRow, dCol)) {
      // Move was successful, update robot position
      map[robotRow][robotCol] = '.';
      robotRow += dRow;
      robotCol += dCol;
      map[robotRow][robotCol] = '@';
    }
  }

  return calculateGPSWide(map);
}

/**
 * Get direction deltas for a move character
 * @param move - Movement character (^v<>)
 * @returns [dRow, dCol] direction deltas
 */
function getDirection(move: string): [number, number] {
  switch (move) {
    case '^': return [-1, 0];
    case 'v': return [1, 0];
    case '<': return [0, -1];
    case '>': return [0, 1];
    default: throw new Error(`Unknown move: ${move}`);
  }
}

/**
 * Try to push boxes in a direction
 * @param map - Warehouse map
 * @param startRow - Starting row
 * @param startCol - Starting column
 * @param dRow - Row direction
 * @param dCol - Column direction
 * @returns True if boxes can be pushed
 */
function tryPushBoxes(map: string[][], startRow: number, startCol: number, dRow: number, dCol: number): boolean {
  const boxes: [number, number][] = [];
  let currentRow = startRow;
  let currentCol = startCol;

  // Find all boxes in the push chain
  while (map[currentRow][currentCol] === 'O') {
    boxes.push([currentRow, currentCol]);
    currentRow += dRow;
    currentCol += dCol;
  }

  // Check if the end is clear
  if (map[currentRow][currentCol] !== '.') {
    return false; // Blocked by wall or another box
  }

  // Move boxes from last to first
  for (let i = boxes.length - 1; i >= 0; i--) {
    const [boxRow, boxCol] = boxes[i];
    const [nextRow, nextCol] = [boxRow + dRow, boxCol + dCol];

    map[nextRow][nextCol] = 'O';
    map[boxRow][boxCol] = '.';
  }

  return true;
}

/**
 * Try to move in wide warehouse (handles wide boxes)
 * @param map - Warehouse map
 * @param row - Current row
 * @param col - Current column
 * @param dRow - Row direction
 * @param dCol - Column direction
 * @returns True if move is possible
 */
function tryMoveWide(map: string[][], row: number, col: number, dRow: number, dCol: number): boolean {
  const toMove = new Set<string>();

  // Check if move is possible (iterative approach)
  const queue = [[row, col]];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    const key = `${r},${c}`;

    if (visited.has(key)) continue;
    visited.add(key);

    const nextR = r + dRow;
    const nextC = c + dCol;

    if (map[r][c] === '#') return false;
    if (map[r][c] === '.') continue;

    toMove.add(key);

    if (map[r][c] === '@') {
      queue.push([nextR, nextC]);
    } else if (map[r][c] === '[') {
      // Left part of wide box - need to check both parts
      queue.push([nextR, nextC]);     // Left part destination
      queue.push([nextR, nextC + 1]); // Right part destination
    } else if (map[r][c] === ']') {
      // Right part of wide box - need to check both parts
      queue.push([nextR, nextC]);     // Right part destination
      queue.push([nextR, nextC - 1]); // Left part destination
    }
  }

  // Perform moves (move from destination to source)
  for (const key of Array.from(toMove).reverse()) {
    const [r, c] = key.split(',').map(Number);
    const nextR = r + dRow;
    const nextC = c + dCol;

    map[nextR][nextC] = map[r][c];
    map[r][c] = '.';
  }

  return true;
}

/**
 * Calculate GPS sum for normal warehouse
 * @param map - Warehouse map
 * @returns Sum of GPS coordinates
 */
function calculateGPS(map: string[][]): number {
  let sum = 0;

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === 'O') {
        sum += 100 * row + col;
      }
    }
  }

  return sum;
}

/**
 * Calculate GPS sum for wide warehouse
 * @param map - Warehouse map
 * @returns Sum of GPS coordinates
 */
function calculateGPSWide(map: string[][]): number {
  let sum = 0;

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === '[') {
        sum += 100 * row + col;
      }
    }
  }

  return sum;
}
