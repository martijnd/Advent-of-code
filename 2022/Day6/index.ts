export function part1(input: string) {
  return getMarker(input, 4);
}

export function part2(input: string) {
  return getMarker(input, 14);
}

function getMarker(input: string, length: number) {
  return input.split('').findIndex((_, index, characters) => {
    const sub = characters.slice(index - length, index);
    return index > length - 1 && new Set(sub).size === sub.length;
  });
}
