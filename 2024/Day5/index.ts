export function part1(input: string) {
  const [rawRules, rawUpdates] = input
    .split('\n\n')
    .map((each) => each.split('\n'));
  const rules = rawRules.map((rule) => rule.split('|').map(Number));
  const updates = rawUpdates.map((update) => update.split(',').map(Number));
  const result = updates.filter((update) => {
    const relevantRules = rules.filter(
      (rule) => update.includes(rule[0]) && update.includes(rule[1])
    );
    return relevantRules.every(([A, B]) => {
      return update.indexOf(A) < update.indexOf(B);
    });
  });

  return result.reduce((acc, curr) => {
    return acc + curr[Math.floor(curr.length / 2)];
  }, 0);
}

export function part2(input: string) {}
