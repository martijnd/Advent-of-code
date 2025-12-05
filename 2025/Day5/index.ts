export function part1(input: string) {
  const [rangesList, IDs] = input.split('\n\n');
  const ranges = rangesList.split('\n').map((r) => r.split('-').map(Number));
  return IDs.split('\n')
    .map(Number)
    .reduce((total, id) => {
      return ranges.find((range) => id >= range[0] && id <= range[1])
        ? total + 1
        : total;
    }, 0);
}

export function part2(input: string) {}
