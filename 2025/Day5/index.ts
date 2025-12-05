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

export function part2(input: string) {
  const [rangesList] = input.split('\n\n');
  const ranges = rangesList
    .split('\n')
    .map((r) => r.split('-').map(Number))
    .sort((a, b) => a[0] - b[0]) as [number, number][];

  const [initial, ...rest] = ranges;
  const list: [number, number][] = [initial];

  // iterate through remaining ranges
  rest.forEach(([rangeStart, rangeEnd]) => {
    // for each range:
    // if it overlaps with current merged range, extend the current range
    const [storedStart, storedEnd] = list[list.length - 1];
    if (rangeStart <= storedEnd)
      // make sure to take the highest highest end value
      list[list.length - 1] = [storedStart, Math.max(storedEnd, rangeEnd)];
    else {
      list.push([rangeStart, rangeEnd]);
    }
  });

  return list.reduce((total, [start, end]) => total + end - start + 1, 0);
}
