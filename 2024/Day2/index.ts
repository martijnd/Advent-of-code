export function part1(input: string) {
  return parse(input).reduce(
    (acc, level) => (checkLevel(level) ? acc + 1 : acc),
    0
  );
}

export function part2(input: string) {
  const levels = input.split('\n').map((line) => line.split(' ').map(Number));

  return levels.reduce((acc, level) => {
    if (checkLevel(level)) {
      return acc + 1;
    }
    const original = [...level];
    const result = level.some((_, i) => {
      level = [...original];
      level.splice(i, 1);
      return checkLevel(level);
    });

    return result ? acc + 1 : acc;
  }, 0);
}

function parse(input: string) {
  return input.split('\n').map((line) => line.split(' ').map(Number));
}

function checkLevel(level: number[]) {
  const allIncreasing = level.every(
    (num, i, arr) => i === arr.length - 1 || num < arr[i + 1]
  );
  const allDecreasing = level.every(
    (num, i, arr) => i === arr.length - 1 || num > arr[i + 1]
  );

  const smallDiff = level.every((num, i, arr) => {
    const diff = Math.abs(num - arr[i + 1]);
    return i === arr.length - 1 || (diff >= 1 && diff <= 3);
  });

  return (allDecreasing || allIncreasing) && smallDiff;
}
