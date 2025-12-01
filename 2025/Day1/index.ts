export function part1(input: string) {
  const lines = input.split('\n');
  const MAP = {
    L: -1,
    R: 1,
  } as const;
  return lines.reduce(
    (acc, line) => {
      const direction = line[0] as keyof typeof MAP;
      const amount = parseInt(line.slice(1));

      const subtotal = acc[0] + amount * MAP[direction];
      const result = subtotal % 100;

      return [result, result === 0 ? acc[1] + 1 : acc[1]];
    },
    [50, 0]
  )[1];
}

export function part2(input: string) {}
