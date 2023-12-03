export function part1(input: string) {
  // only 12 red cubes, 13 green cubes, and 14 blue cubes
  const data = input.split('\n');
  const game = data.map((turn) => ({
    game: Number(turn.split(':')[0].split(' ')[1]),
    data: turn.split(': ')[1].split('; '),
  }));

  const map = {
    red: 12,
    green: 13,
    blue: 14,
  } as Record<string, number>;

  const possibleGames = game.filter((turns) => {
    return turns.data.every((draw) =>
      draw.split(', ').every((unit) => {
        const [amount, color] = unit.split(' ');
        return Number(amount) <= map[color];
      })
    );
  });

  return possibleGames.reduce((acc, curr) => acc + Number(curr.game), 0);
}

export function part2(input: string) {
  const data = input.split('\n');
  const game = data.map((turn) => ({
    game: Number(turn.split(':')[0].split(' ')[1]),
    data: turn.split(': ')[1].split('; '),
  }));

  const map = {
    red: 12,
    green: 13,
    blue: 14,
  } as Record<string, number>;

  const possibleGames = game.map((turns) => {
    return turns.data
      .map((draw) => {
        const result = { red: 0, green: 0, blue: 0 } as Record<string, number>;
        const data = draw.split(', ').map((unit) => ({
          amount: Number(unit.split(' ')[0]),
          color: unit.split(' ')[1],
        }));
        data.forEach((dat) => {
          if (result[dat.color] < dat.amount) {
            result[dat.color] = dat.amount;
          }
        });
        return result;
      })
      .reduce(
        (acc, curr) => {
          if (acc.red < curr.red) {
            acc.red = curr.red;
          }
          if (acc.green < curr.green) {
            acc.green = curr.green;
          }
          if (acc.blue < curr.blue) {
            acc.blue = curr.blue;
          }
          return acc;
        },
        { red: 0, green: 0, blue: 0 } as Record<string, number>
      );
  });

  return possibleGames
    .map((game) => Object.values(game).reduce((acc, curr) => acc * curr))
    .reduce((acc, curr) => acc + curr);
}
