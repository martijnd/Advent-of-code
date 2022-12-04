export function part1(input: string) {
  return input
    .split('\n')
    .map((pair) => pair.split(',').map(getSequence))
    .reduce(
      (total, [pairA, pairB]) =>
        pairA.every((A) => pairB.includes(A)) ||
        pairB.every((B) => pairA.includes(B))
          ? total + 1
          : total,
      0
    );
}

function getSequence(range: string) {
  const [min, max] = range.split('-').map(Number);

  return [...Array(max - min)].map((_, i) => i + min);
}

export function part2(input: string) {
  return input
    .split('\n')
    .map((pair) => pair.split(',').map(getSequence))
    .reduce(
      (total, [pairA, pairB]) =>
        pairA.some((A) => pairB.includes(A)) ||
        pairB.some((B) => pairA.includes(B))
          ? total + 1
          : total,
      0
    );
}
