export function part1(input: string) {
  const pairs = input
    .split('\n')
    .map((pair) => pair.split(','))
    .map((parsedPair) => parsedPair.map(getSequence));

  return pairs.reduce(
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
  let result: number[] = [];

  for (let i = min; i <= max; i++) {
    result = [...result, i];
  }

  return result;
}

export function part2(input: string) {
  const pairs = input
    .split('\n')
    .map((pair) => pair.split(','))
    .map((parsedPair) => parsedPair.map(getSequence));

  return pairs.reduce(
    (total, [pairA, pairB]) =>
      pairA.some((A) => pairB.includes(A)) ||
      pairB.some((B) => pairA.includes(B))
        ? total + 1
        : total,
    0
  );
}
