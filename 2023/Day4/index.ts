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

export function part2(input: string): number {
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

  // Count matches for each card
  const matches = cards.map(({ ownNumbers, winningNumbers }) =>
    ownNumbers.filter(num => winningNumbers.includes(num)).length
  );

  // Use dynamic programming to count total cards
  const cardCounts = new Array(cards.length).fill(1);

  for (let i = 0; i < cards.length; i++) {
    const matchCount = matches[i];
    for (let j = 1; j <= matchCount && i + j < cards.length; j++) {
      cardCounts[i + j] += cardCounts[i];
    }
  }

  return cardCounts.reduce((sum, count) => sum + count, 0);
}
