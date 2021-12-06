export function part1(input: string) {
  return calculate(input.split(',').map(Number), 80);
}

export function part2(input: string) {
  return calculate(input.split(',').map(Number), 256);
}

function shift(fish: Record<number, number>) {
  return Object.entries(fish).reduce((acc, [idx, _]) => {
    const cIndex = parseInt(idx);
    const cValue = Object.assign({}, fish)[+idx];

    return cIndex === 0
      ? {
          ...acc,
          [cIndex]: acc[cIndex] - cValue,
          6: acc[6] + cValue,
          8: acc[8] + cValue,
        }
      : {
          ...acc,
          [cIndex]: acc[cIndex] - cValue,
          [cIndex - 1]: acc[cIndex - 1] + cValue,
        };
  }, fish);
}

function calculate(fish: number[], days: number) {
  const startObj = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }  as Record<number, number>;
  let cumulatives = fish.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: acc[curr] ? acc[curr] + 1 : 1,
    }),
    startObj
  );

  for (let _ = 0; _ < days; _++) {
    cumulatives = shift(cumulatives);
  }

  return Object.values(cumulatives).reduce(sum);
}

function sum(a: number, b: number) {
  return a + b;
}
