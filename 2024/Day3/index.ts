export function part1(input: string) {
  const regex = new RegExp(/mul\((\d{1,3}),(\d{1,3})\)/, 'g');
  let sums: [number, number][] = [];
  let match;
  while ((match = regex.exec(input))) {
    sums = [...sums, [Number(match[1]), Number(match[2])]];
  }

  return sums.reduce((acc, sum) => acc + sum[0] * sum[1], 0);
}

export function part2(input: string) {
  const regex = new RegExp(/do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/, 'g');
  let sums: (string | [string, string])[] = [];
  let match;
  while ((match = regex.exec(input))) {
    if (match[1] === undefined) {
      sums = [...sums, match[0]];
    } else {
      sums = [...sums, [match[1], match[2]]];
    }
  }

  let go = true;
  return sums.reduce((acc, sum) => {
    if (sum === 'do()') {
      go = true;
    } else if (sum === "don't()") {
      go = false;
    } else if (go) {
      return acc + Number(sum[0]) * Number(sum[1]);
    }
    return acc;
  }, 0);
}
