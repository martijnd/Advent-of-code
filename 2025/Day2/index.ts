export function part1(input: string) {
  const IDs = input.split(',');
  return IDs.reduce((acc, id) => {
    const [start, end] = id.split('-').map(Number);
    let total = 0;
    for (let i = start; i <= end; i++) {
      const arr = String(i).split('');
      if (arr.length % 2 === 1) {
        continue;
      }
      const s = arr.slice(0, arr.length / 2).join('');
      const e = arr.slice(arr.length / 2).join('');
      if (s === e) {
        total += i;
      }
    }

    return acc + total;
  }, 0);
}

export function part2(input: string) {}
