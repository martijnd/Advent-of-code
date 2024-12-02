export function part1(input: string) {
  return parse(input).reduce(
    (acc, level) => (checkLevel(level) ? acc + 1 : acc),
    0
  );
}

export function part2(input: string) {
  return parse(input).reduce(
    (acc, level) =>
      checkLevel(level) ||
      level.some((_, i) => checkLevel(level.toSpliced(i, 1)))
        ? acc + 1
        : acc,
    0
  );
}

function parse(input: string) {
  return input.split('\n').map((line) => line.split(' ').map(Number));
}

function checkLevel(level: number[]) {
  const allIncreasing = level.every((num, i, arr) => {
    if (i === arr.length - 1) return true;
    return num < arr[i + 1];
  });
  const allDecreasing = level.every((num, i, arr) => {
    if (i === arr.length - 1) return true;
    return num > arr[i + 1];
  });
  const smallDiff = level.every((num, i, arr) => {
    if (i === arr.length - 1) return true;
    const diff = Math.abs(num - arr[i + 1]);
    return diff >= 1 && diff <= 3;
  });

  return (allDecreasing || allIncreasing) && smallDiff;
}
