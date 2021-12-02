export function part1 (input: string) {
  const moves = input.split("\n");

  const pos = moves.reduce(({horizontal, depth}, move) => {
    const [direction, amount] = move.split(' ');

    if (direction === 'up') {
      return {horizontal, depth: depth - Number(amount)};
    }
    if (direction === 'down') {
      return {horizontal, depth: depth + Number(amount)};
    }
    if (direction === 'forward') {
      return {horizontal: horizontal + Number(amount), depth};
    }
  
    return {horizontal, depth};

  }, {horizontal: 0, depth: 0});
  
  return Object.values(pos).reduce((acc, x) => acc * x);
}

export function part2 (input: string) {

}
