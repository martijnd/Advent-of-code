export function part1(input: string) {
  return input
    .split('\n')
    .map(
      (backpack) =>
        [
          backpack.slice(0, backpack.length / 2),
          backpack.slice(backpack.length / 2, backpack.length),
        ] as [string, string]
    )
    .map((contents) => findCommon(...contents))
    .reduce((total, char) => total + getCharCode(char), 0);
}

function getCharCode(char: string) {
  if (char === char.toUpperCase()) {
    return char.charCodeAt(0) - 38;
  }

  return char.charCodeAt(0) - 96;
}

function findCommon(...array: string[]) {
  const [A, ...rest] = array;

  return A.split('').find((char) =>
    rest.every((arr) => arr.split('').includes(char))
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
    .map((group) => findCommon(...group))
    .reduce((total, curr) => total + getCharCode(curr), 0);
}
