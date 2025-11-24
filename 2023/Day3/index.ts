/**
 * Part 1: Find numbers adjacent to symbols
 * @param input - Grid of characters with numbers and symbols
 * @returns Sum of numbers adjacent to symbols
 */
export function part1(input: string): number {
  const grid = input.trim().split('\n');
  const numbers: Array<{ value: number; positions: Array<[number, number]> }> = [];

  // Find all numbers and their positions
  for (let row = 0; row < grid.length; row++) {
    const line = grid[row];
    const matches = line.matchAll(/\d+/g);

    for (const match of matches) {
      const value = parseInt(match[0]);
      const positions: Array<[number, number]> = [];

      for (let col = match.index!; col < match.index! + match[0].length; col++) {
        positions.push([row, col]);
      }

      numbers.push({ value, positions });
    }
  }

  let sum = 0;

  // Check each number to see if it's adjacent to a symbol
  for (const number of numbers) {
    let isAdjacent = false;

    for (const [row, col] of number.positions) {
      // Check all 8 adjacent positions
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue; // Skip the number itself

          const newRow = row + dr;
          const newCol = col + dc;

          if (
            newRow >= 0 &&
            newRow < grid.length &&
            newCol >= 0 &&
            newCol < grid[newRow].length
          ) {
            const char = grid[newRow][newCol];
            if (char !== '.' && !/\d/.test(char)) {
              // Found a symbol (not digit, not dot)
              isAdjacent = true;
              break;
            }
          }
        }
        if (isAdjacent) break;
      }
      if (isAdjacent) break;
    }

    if (isAdjacent) {
      sum += number.value;
    }
  }

  return sum;
}

/**
 * Part 2: Find gear ratios (numbers adjacent to *)
 * @param input - Grid of characters
 * @returns Sum of gear ratios (* with exactly 2 adjacent numbers)
 */
export function part2(input: string): number {
  const grid = input.trim().split('\n');
  const numbers: Array<{ value: number; positions: Array<[number, number]> }> = [];
  const gears: Array<{ position: [number, number]; adjacentNumbers: number[] }> = [];

  // Find all numbers and their positions
  for (let row = 0; row < grid.length; row++) {
    const line = grid[row];
    const matches = line.matchAll(/\d+/g);

    for (const match of matches) {
      const value = parseInt(match[0]);
      const positions: Array<[number, number]> = [];

      for (let col = match.index!; col < match.index! + match[0].length; col++) {
        positions.push([row, col]);
      }

      numbers.push({ value, positions });
    }
  }

  // Find all gears (*) and check adjacent numbers
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === '*') {
        const adjacentNumbers: number[] = [];

        // Check all adjacent numbers
        for (const number of numbers) {
          let isAdjacent = false;

          for (const [numRow, numCol] of number.positions) {
            // Check if this number position is adjacent to the gear
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;

                const checkRow = numRow + dr;
                const checkCol = numCol + dc;

                if (checkRow === row && checkCol === col) {
                  isAdjacent = true;
                  break;
                }
              }
              if (isAdjacent) break;
            }

            if (isAdjacent) {
              adjacentNumbers.push(number.value);
              break; // This number is adjacent, don't check other positions
            }
          }
        }

        if (adjacentNumbers.length === 2) {
          gears.push({
            position: [row, col],
            adjacentNumbers
          });
        }
      }
    }
  }

  // Calculate gear ratios
  let sum = 0;
  for (const gear of gears) {
    sum += gear.adjacentNumbers[0] * gear.adjacentNumbers[1];
  }

  return sum;
}
