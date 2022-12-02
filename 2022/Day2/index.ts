type TheirDraw = 'A' | 'B' | 'C';
type OurDraw = 'X' | 'Y' | 'Z';

export function part1(input: string) {
  const rounds = input.split('\n').map((draw) => draw.split(' ')) as [
    TheirDraw,
    OurDraw
  ][];

  return rounds.reduce((acc, [A, B]) => acc + getScore(A, B), 0);
}

function getOurDraw(A: TheirDraw, B: OurDraw): OurDraw {
  const map = {
    A: {
      X: 'Z',
      Y: 'X',
      Z: 'Y',
    },
    B: {
      X: 'X',
      Y: 'Y',
      Z: 'Z',
    },
    C: {
      X: 'Y',
      Y: 'Z',
      Z: 'X',
    },
  } as const;

  return map[A][B];
}

function getScore(A: TheirDraw, B: OurDraw): number {
  const map = {
    A: {
      X: 1 + 3,
      Y: 2 + 6,
      Z: 3 + 0,
    },
    B: {
      X: 1 + 0,
      Y: 2 + 3,
      Z: 3 + 6,
    },
    C: {
      X: 1 + 6,
      Y: 2 + 0,
      Z: 3 + 3,
    },
  };

  return map[A][B];
}

export function part2(input: string) {
  const rounds = input.split('\n').map((draw) => draw.split(' ')) as [
    TheirDraw,
    OurDraw
  ][];

  return rounds.reduce((acc, [A, B]) => acc + getScore(A, getOurDraw(A, B)), 0);
}
