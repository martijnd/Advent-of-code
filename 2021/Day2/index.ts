export function part1(input: string) {
  const moves = input.split("\n");

  const pos = moves.reduce(
    ({ horizontal, depth }, move) => {
      const [direction, amount] = move.split(" ");

      if (direction === "up") {
        return { horizontal, depth: depth - Number(amount) };
      }
      if (direction === "down") {
        return { horizontal, depth: depth + Number(amount) };
      }
      if (direction === "forward") {
        return { horizontal: horizontal + Number(amount), depth };
      }

      return { horizontal, depth };
    },
    { horizontal: 0, depth: 0 }
  );

  return Object.values(pos).reduce((acc, x) => acc * x);
}

export function part2(input: string) {
  const moves = input.split("\n");

  const pos = moves.reduce(
    ({ horizontal, depth, aim }, move) => {
      const [direction, amount] = move.split(" ");

      if (direction === "up") {
        return { horizontal, depth, aim: aim - Number(amount) };
      }
      if (direction === "down") {
        return { horizontal, depth, aim: aim + Number(amount) };
      } else {
        return {
          horizontal: horizontal + Number(amount),
          depth: depth + aim * Number(amount),
          aim,
        };
      }
    },
    { horizontal: 0, depth: 0, aim: 0 }
  );

  return pos.horizontal * pos.depth;
}
