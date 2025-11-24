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

function topologicalSort(pages: number[], rules: [number, number][]): number[] {
  // Build adjacency list and in-degree count
  const graph = new Map<number, number[]>();
  const inDegree = new Map<number, number>();

  // Initialize all pages
  pages.forEach((page) => {
    graph.set(page, []);
    inDegree.set(page, 0);
  });

  // Build graph from rules (only rules where both pages are in the update)
  rules.forEach(([before, after]) => {
    if (pages.includes(before) && pages.includes(after)) {
      if (!graph.has(before)) {
        graph.set(before, []);
      }
      graph.get(before)!.push(after);
      inDegree.set(after, (inDegree.get(after) || 0) + 1);
    }
  });

  // Kahn's algorithm for topological sort
  const queue: number[] = [];
  const result: number[] = [];

  // Find all nodes with no incoming edges
  pages.forEach((page) => {
    if (inDegree.get(page) === 0) {
      queue.push(page);
    }
  });

  while (queue.length > 0) {
    // Sort queue to ensure deterministic ordering (stable sort)
    queue.sort((a, b) => a - b);
    const current = queue.shift()!;
    result.push(current);

    // Process neighbors
    const neighbors = graph.get(current) || [];
    neighbors.forEach((neighbor) => {
      const degree = inDegree.get(neighbor)! - 1;
      inDegree.set(neighbor, degree);
      if (degree === 0) {
        queue.push(neighbor);
      }
    });
  }

  return result;
}

export function part2(input: string) {
  const [rawRules, rawUpdates] = input
    .split('\n\n')
    .map((each) => each.split('\n'));
  const rules = rawRules.map(
    (rule) => rule.split('|').map(Number) as [number, number]
  );
  const updates = rawUpdates.map((update) => update.split(',').map(Number));

  // Find incorrectly ordered updates
  const incorrectUpdates = updates.filter((update) => {
    const relevantRules = rules.filter(
      (rule) => update.includes(rule[0]) && update.includes(rule[1])
    );
    return relevantRules.some(([A, B]) => {
      return update.indexOf(A) > update.indexOf(B);
    });
  });

  // Sort each incorrectly ordered update and sum middle page numbers
  return incorrectUpdates
    .map((update) => topologicalSort(update, rules))
    .reduce((acc, curr) => {
      return acc + curr[Math.floor(curr.length / 2)];
    }, 0);
}
