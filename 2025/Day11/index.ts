export function part1(input: string) {
  const data = input.split('\n').reduce((acc, line) => {
    const [key, rest] = line.split(': ');
    const values = rest.split(' ');
    acc[key] = values;
    return acc;
  }, {} as Record<string, string[]>);

  return traverse(data, 'you', 0);
}

function traverse(
  data: Record<string, string[]>,
  key: string,
  total: number
): number {
  if (data[key].includes('out')) {
    return total + 1;
  }

  return data[key].reduce((acc, curr) => {
    return acc + traverse(data, curr, total);
  }, 0);
}

export function part2(input: string) {}
