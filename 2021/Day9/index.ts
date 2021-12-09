export function part1(input: string) {
  const locations = input.split('\n').map((num) => num.split('').map(Number));

  const rowCount = locations.length;
  const colCount = locations[0].length;
  let total = 0;

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      let match = true;

      const curr = locations[row][col];
      const locs = {
        top: locations?.[row - 1]?.[col],
        bottom: locations?.[row + 1]?.[col],
        left: locations?.[row]?.[col - 1],
        right: locations?.[row]?.[col + 1],
      };

      const values = Object.values(locs);
      for (let loc of values) {
        if (loc !== undefined && +loc <= curr) {
          match = false;
        }
      }
      
      if (match) {
        total += 1 + curr;
      }
    }
  }

  return total;
}

export function part2(input: string) {}
