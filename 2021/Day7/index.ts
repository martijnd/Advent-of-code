export function part1(input: string) {
  return calculate(input);
}

export function part2(input: string) {
  return calculate(input, (num: number) =>
    [...Array(num)].reduce((a, _, i) => a + i + 1, 0)
  );
}

function calculate(input: string, cb: (num: number) => number = (x) => x) {
  const crabSubmarines = input.split(',').map(Number);

  return [...Array(Math.max(...crabSubmarines))].reduce((acc, __, i) => {
    const sum = crabSubmarines.reduce(
      (acc, curr) => acc + cb(Math.abs(i - curr)),
      0
    );

    return sum < acc ? sum : acc;
  }, Infinity);
}
