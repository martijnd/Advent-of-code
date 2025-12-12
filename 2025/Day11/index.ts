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

export function part2(input: string) {
  const data = input.split('\n').reduce((acc, line) => {
    const [key, rest] = line.split(': ');
    const values = rest.split(' ');
    acc[key] = values;
    return acc;
  }, {} as Record<string, string[]>);
  const path: string[] = ['svr'];
  return traverse2(data, 'svr', path, 0);
}

function traverse2(
  data: Record<string, string[]>,
  key: string,
  path: string[],
  total: number
): number {
  if (data[key].includes('out')) {
    if (path.includes('fft') && path.includes('dac')) {
      return total + 1;
    }
    return total;
  }

  return data[key].reduce((acc, curr) => {
    path = [...path, curr];
    return acc + traverse2(data, curr, path, total);
  }, 0);
}
