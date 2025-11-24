/**
 * Part 1: Calculate total fencing cost (area * perimeter for each region)
 * @param input - Grid of garden plots
 * @returns Total fencing cost
 */
export function part1(input: string): number {
  const grid = input.trim().split('\n').map(line => line.split(''));
  const regions = findRegions(grid);

  let totalCost = 0;
  for (const region of regions) {
    const area = region.plots.size;
    const perimeter = calculatePerimeter(grid, region);
    totalCost += area * perimeter;
  }

  return totalCost;
}

/**
 * Part 2: Calculate total fencing cost using number of sides instead of perimeter
 * @param input - Grid of garden plots
 * @returns Total fencing cost with sides calculation
 */
export function part2(input: string): number {
  const grid = input.trim().split('\n').map(line => line.split(''));
  const regions = findRegions(grid);

  let totalCost = 0;
  for (const region of regions) {
    const area = region.plots.size;
    const sides = calculateSides(grid, region);
    totalCost += area * sides;
  }

  return totalCost;
}

/**
 * Find all regions in the grid (connected components of same plant type)
 * @param grid - 2D grid of plant types
 * @returns Array of regions with their plots
 */
function findRegions(grid: string[][]): Region[] {
  const regions: Region[] = [];
  const visited = new Set<string>();

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const key = `${row},${col}`;
      if (visited.has(key)) continue;

      const plantType = grid[row][col];
      const region: Region = {
        plantType,
        plots: new Set<string>()
      };

      // Flood fill to find all connected plots of same type
      const stack = [[row, col]];
      while (stack.length > 0) {
        const [r, c] = stack.pop()!;
        const plotKey = `${r},${c}`;

        if (visited.has(plotKey)) continue;
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[r].length) continue;
        if (grid[r][c] !== plantType) continue;

        visited.add(plotKey);
        region.plots.add(plotKey);

        // Check all 4 directions
        stack.push([r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]);
      }

      if (region.plots.size > 0) {
        regions.push(region);
      }
    }
  }

  return regions;
}

/**
 * Calculate perimeter of a region (number of edges not touching same type)
 * @param grid - 2D grid
 * @param region - Region to analyze
 * @returns Perimeter length
 */
function calculatePerimeter(grid: string[][], region: Region): number {
  let perimeter = 0;

  for (const plotKey of region.plots) {
    const [row, col] = plotKey.split(',').map(Number);

    // Check all 4 sides
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1] // up, down, left, right
    ];

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      // If adjacent plot is out of bounds or different type, it contributes to perimeter
      if (
        newRow < 0 || newRow >= grid.length ||
        newCol < 0 || newCol >= grid[newRow].length ||
        grid[newRow][newCol] !== region.plantType
      ) {
        perimeter++;
      }
    }
  }

  return perimeter;
}

/**
 * Calculate number of sides (straight edges) of a region
 * @param grid - 2D grid
 * @param region - Region to analyze
 * @returns Number of sides
 */
function calculateSides(grid: string[][], region: Region): number {
  let sides = 0;

  // Check each plot for corners (changes in direction)
  for (const plotKey of region.plots) {
    const [row, col] = plotKey.split(',').map(Number);

    // Check all 4 corners of each plot
    const corners = [
      // Top-left corner: check up and left
      { dirs: [[-1, 0], [0, -1]], corner: [-1, -1] },
      // Top-right corner: check up and right
      { dirs: [[-1, 0], [0, 1]], corner: [-1, 1] },
      // Bottom-left corner: check down and left
      { dirs: [[1, 0], [0, -1]], corner: [1, -1] },
      // Bottom-right corner: check down and right
      { dirs: [[1, 0], [0, 1]], corner: [1, 1] }
    ];

    for (const { dirs, corner } of corners) {
      const [dr1, dc1] = dirs[0];
      const [dr2, dc2] = dirs[1];
      const [cr, cc] = corner;

      // Check if this forms a corner
      const adj1Row = row + dr1;
      const adj1Col = col + dc1;
      const adj2Row = row + dr2;
      const adj2Col = col + dc2;

      const adj1IsSame = isInRegion(adj1Row, adj1Col, region, grid);
      const adj2IsSame = isInRegion(adj2Row, adj2Col, region, grid);
      const cornerIsSame = isInRegion(row + cr, col + cc, region, grid);

      // Convex corner: both adjacent plots are different from this region
      if (!adj1IsSame && !adj2IsSame) {
        sides++;
      }
      // Concave corner: both adjacent plots are same, but diagonal is different
      else if (adj1IsSame && adj2IsSame && !cornerIsSame) {
        sides++;
      }
    }
  }

  return sides;
}

/**
 * Check if a position is within the region
 * @param row - Row coordinate
 * @param col - Column coordinate
 * @param region - Region to check
 * @param grid - Grid for bounds checking
 * @returns True if position is in region
 */
function isInRegion(row: number, col: number, region: Region, grid: string[][]): boolean {
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) {
    return false;
  }
  return region.plots.has(`${row},${col}`);
}

interface Region {
  plantType: string;
  plots: Set<string>; // Set of "row,col" strings
}
