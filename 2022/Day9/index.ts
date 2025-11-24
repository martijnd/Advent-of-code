type Direction = 'U' | 'D' | 'L' | 'R';

export function part1(input: string) {
  const steps = input
    .split('\n')
    .map(
      (step) =>
        [step.split(' ')[0] as Direction, Number(step.split(' ')[1])] as const
    );
  const visitedPositions: { x: number; y: number }[] = [{ x: 0, y: 0 }];
  // Starting point
  let currentHeadPosition = { x: 0, y: 0 };
  let currentTailPosition = { x: 0, y: 0 };

  const mutations: Record<Direction, { x: number; y: number }> = {
    R: { x: 1, y: 0 },
    L: { x: -1, y: 0 },
    U: { x: 0, y: -1 },
    D: { x: 0, y: 1 },
  };

  steps.forEach(([direction, amount]) => {
    for (let i = 0; i < amount; i++) {
      const previousHeadPosition = { ...currentHeadPosition };
      currentHeadPosition = {
        x: currentHeadPosition.x + mutations[direction].x,
        y: currentHeadPosition.y + mutations[direction].y,
      };

      // Are they touching?
      if (
        Math.abs(currentHeadPosition.x - currentTailPosition.x) <= 1 &&
        Math.abs(currentHeadPosition.y - currentTailPosition.y) <= 1
      ) {
        continue;
      }

      currentTailPosition = previousHeadPosition;
      if (
        !visitedPositions.find(
          ({ x, y }) =>
            previousHeadPosition.x === x && previousHeadPosition.y === y
        )
      ) {
        visitedPositions.push(previousHeadPosition);
      }
    }
  });
  return visitedPositions.length;
}

export function part2(input: string): number {
  const steps = input
    .split('\n')
    .map(
      (step) =>
        [step.split(' ')[0] as Direction, Number(step.split(' ')[1])] as const
    );

  // 10 knots total: positions 0-9, where 0 is head and 9 is tail
  const knots = Array.from({ length: 10 }, () => ({ x: 0, y: 0 }));
  const visited = new Set<string>();
  visited.add('0,0');

  const directions: Record<Direction, { x: number; y: number }> = {
    R: { x: 1, y: 0 },
    L: { x: -1, y: 0 },
    U: { x: 0, y: -1 },
    D: { x: 0, y: 1 },
  };

  for (const [direction, amount] of steps) {
    for (let step = 0; step < amount; step++) {
      // Move head
      knots[0].x += directions[direction].x;
      knots[0].y += directions[direction].y;

      // Move each subsequent knot to follow the previous one
      for (let i = 1; i < knots.length; i++) {
        const prevKnot = knots[i - 1];
        const currentKnot = knots[i];

        const dx = prevKnot.x - currentKnot.x;
        const dy = prevKnot.y - currentKnot.y;

        // If not adjacent (including diagonally), move towards the previous knot
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          currentKnot.x += Math.sign(dx);
          currentKnot.y += Math.sign(dy);
        }
      }

      // Track tail position (knot 9)
      visited.add(`${knots[9].x},${knots[9].y}`);
    }
  }

  return visited.size;
}
