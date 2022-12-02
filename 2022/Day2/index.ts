export function part1(input: string) {
  const rounds = input.split('\n').map((x) => x.split(' ')) as [
    'A' | 'B' | 'C',
    'X' | 'Y' | 'Z'
  ][];

  return rounds.reduce((acc, round) => acc + getScore(...round), 0);
}

function getOurInput(A: 'A' | 'B' | 'C', B: 'X' | 'Y' | 'Z') {
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

function getScore(A: 'A' | 'B' | 'C', B: 'X' | 'Y' | 'Z') {
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
  const rounds = input.split('\n').map((x) => x.split(' ')) as [
    'A' | 'B' | 'C',
    'X' | 'Y' | 'Z'
  ][];

  return rounds.reduce(
    (acc, round) => acc + getScore(round[0], getOurInput(round[0], round[1])),
    0
  );
}
