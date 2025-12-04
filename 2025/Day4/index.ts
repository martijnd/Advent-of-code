export function part1(input: string) {
  const map = input.split('\n').map((x) => x.split(''));
  let count = 0;
  const positions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] !== '@') {
        continue;
      }

      let rollCount = 0;
      positions.forEach(([dX, dY]) => {
        if (
          y + dY < 0 ||
          x + dX < 0 ||
          y + dY > map.length - 1 ||
          x + dX > map[0].length - 1
        ) {
          return;
        }

        if (map[y + dY][x + dX] === '@') {
          rollCount++;
        }
      });

      if (rollCount < 4) {
        count++;
      }
    }
  }

  return count;
}

export function part2(input: string) {
  return calculate(input.split('\n').map((x) => x.split('')));
}

function calculate(map: string[][], total = 0) {
  let replacedRolls: { x: number; y: number }[] = [];
  const positions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] !== '@') {
        continue;
      }

      let rollCount = 0;
      positions.forEach(([dX, dY]) => {
        if (
          y + dY < 0 ||
          x + dX < 0 ||
          y + dY > map.length - 1 ||
          x + dX > map[0].length - 1
        ) {
          return;
        }

        if (map[y + dY][x + dX] === '@') {
          rollCount++;
        }
      });

      if (rollCount < 4) {
        replacedRolls.push({ x, y });
      }
    }
  }

  replacedRolls.forEach(({ x, y }) => {
    map[y][x] = '.';
  });

  if (replacedRolls.length > 0) {
    total += calculate(map, replacedRolls.length);
  }

  return total;
}
