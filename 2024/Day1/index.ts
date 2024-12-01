export function part1(input: string) {
  const [A, B] = input.split('\n').reduce(
    (acc, line) => {
      const [num1, num2] = line.split('   ').map(Number);
      return [
        [...acc[0], num1],
        [...acc[1], num2],
      ];
    },
    [[], []] as [number[], number[]]
  );

  A.sort();
  B.sort();
  let sum = 0;
  for (let i = 0; i < A.length; i++) {
    sum += Math.abs(A[i] - B[i]);
  }

  return sum;
}

export function part2(input: string) {}
