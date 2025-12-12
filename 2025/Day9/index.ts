export function part1(input: string) {
  const entries = input
    .split('\n')
    .map((x) => x.split(',').map(Number))
    .map(([x, y]) => ({ x, y }));
  let max = 0;
  for (let i = 0; i < entries.length; i++) {
    for (let j = 0; j < entries.length; j++) {
      if (i > j) {
        const entry1 = entries[i];
        const entry2 = entries[j];
        const area = (entry2.x - entry1.x + 1) * (entry2.y - entry1.y + 1);
        if (area > max) {
          max = area;
        }
      }
    }
  }
  console.log(entries);

  return max;
}

export function part2(input: string) {}
