export function part1(input: string) {
  const cards = input.split('\n').map((card) => {
    const [winningNumbersBruto, ownNumbers] = card.split('|');

    return {
      ownNumbers: ownNumbers
        .trim()
        .split(' ')
        .filter((r) => r !== '')
        .map(Number),
      winningNumbers: winningNumbersBruto
        .split(':')[1]
        .trim()
        .split(' ')
        .filter((r) => r !== '')
        .map(Number),
    };
  });
  return cards.reduce((acc, { ownNumbers, winningNumbers }) => {
    const sum = ownNumbers.reduce((acc, ownNumber) => {
      return winningNumbers.includes(ownNumber) ? acc + 1 : acc;
    }, 0);
    return sum > 0 ? acc + 2 ** (sum - 1) : acc;
  }, 0);
}

export function part2(input: string) {}
