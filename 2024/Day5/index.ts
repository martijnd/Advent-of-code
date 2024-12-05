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

function getRuleOrder(rules: [number, number][]): number[] {
  let result: number[] = [];
  rules.forEach(([low, high]) => {
    if (!result.includes(low)) {
      result = [low, ...result];
    }
    if (!result.includes(high)) {
      result = [...result, high];
    }
    if (result.includes(low) && result.includes(high)) {
      const lowIndex = result.indexOf(low);
      const highIndex = result.indexOf(high);
      if (lowIndex > highIndex) {
        result[lowIndex] = high;
        result[highIndex] = low;
      }
    }
  });

  return result;
}

export function part2(input: string) {
  const [rawRules, rawUpdates] = input
    .split('\n\n')
    .map((each) => each.split('\n'));
  const rules = rawRules.map(
    (rule) => rule.split('|').map(Number) as [number, number]
  );
  const ORDER = getRuleOrder(rules);
  const updates = rawUpdates.map((update) => update.split(',').map(Number));
  const incorrectUpdates = updates.filter((update) => {
    const relevantRules = rules.filter(
      (rule) => update.includes(rule[0]) && update.includes(rule[1])
    );
    return (
      relevantRules.filter(([A, B]) => {
        return update.indexOf(A) > update.indexOf(B);
      }).length > 0
    );
  });

  return incorrectUpdates
    .map((update) => ORDER.filter((num) => update.includes(num)))
    .reduce((acc, curr) => {
      return acc + curr[Math.floor(curr.length / 2)];
    }, 0);
}
