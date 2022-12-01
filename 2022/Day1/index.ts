export function part1(input: string) {
  const formatted = input
    .split('\n\n')
    .map((x) => x.split('\n').reduce((acc, curr) => acc + parseInt(curr), 0));
  return Math.max(...formatted);
}

export function part2(input: string) {
  const formatted = input
    .split('\n\n')
    .map((x) => x.split('\n').reduce((acc, curr) => acc + parseInt(curr), 0))
    .sort((a, b) => b - a);

  return formatted.slice(0, 3).reduce((acc, curr) => acc + curr);
}
