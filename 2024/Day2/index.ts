export function part1(input: string) {
  const levels = input.split('\n').map((line) => line.split(' ').map(Number));

  return levels.reduce((acc, level) => {
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
      return diff > 0 && diff <= 3;
    });

    return (allDecreasing || allIncreasing) && smallDiff ? acc + 1 : acc;
  }, 0);
}

export function part2(input: string) {}
