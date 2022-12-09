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

export function part2(input: string) {}
