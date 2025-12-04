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

const ROLL = '@';

export function part1(input: string) {
  const map = input.split('\n').map((x) => x.split(''));
  let count = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] !== ROLL) {
        continue;
      }

      if (countAdjacentRolls(map, x, y) < 4) {
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

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] !== ROLL) {
        continue;
      }

      if (countAdjacentRolls(map, x, y) < 4) {
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

function countAdjacentRolls(map: string[][], x: number, y: number) {
  return positions.reduce((acc, [dX, dY]) => {
    const newY = y + dY;
    const newX = x + dX;
    const validPosition =
      newY >= 0 && newX >= 0 && newY < map.length && newX < map[0].length;

    return validPosition && map[newY][newX] === ROLL ? acc + 1 : acc;
  }, 0);
}
