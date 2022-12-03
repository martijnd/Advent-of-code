export function part1(input: string) {
  const backpacks = input
    .split('\n')
    .map(
      (backpack) =>
        [
          backpack.slice(0, backpack.length / 2),
          backpack.slice(backpack.length / 2, backpack.length),
        ] as [string, string]
    )
    .map((A) => findCommon(A))
    .reduce((acc, char) => acc + getCharCode(char), 0);

  return backpacks;
}

function getCharCode(char: string) {
  if (char === char.toUpperCase()) {
    return char.charCodeAt(0) - 38;
  }

  return char.charCodeAt(0) - 96;
}

function findCommon([A, B]: [string, string]) {
  return A.split('').find((char) => B.split('').includes(char))!;
}

function findCommonInThree([A, B, C]: [string, string, string]) {
  return A.split('').find(
    (char) => B.split('').includes(char) && C.split('').includes(char)
  )!;
}

export function part2(input: string) {
  return input
    .split('\n')
    .reduce((result: string[][], curr, index) => {
      const chunkIndex = Math.floor(index / 3);

      if (!result[chunkIndex]) {
        result[chunkIndex] = [];
      }

      result[chunkIndex] = [...result[chunkIndex], curr];

      return result;
    }, [])
    .map((group) => findCommonInThree(group as [string, string, string]))
    .reduce((acc, curr) => acc + getCharCode(curr), 0);
}
