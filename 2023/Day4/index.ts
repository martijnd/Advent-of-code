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

export function part2(input: string) {
  const cards = input.split('\n').map((card) => {
    const [winningNumbersBruto, ownNumbers] = card.split('|');

    return {
      gameIndex: Number(winningNumbersBruto.split(':')[0].split(' ')[1]) - 1,
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
  return recurse(cards, 0).length;
}

function recurse(
  cardsArray: {
    gameIndex: number;
    winningNumbers: number[];
    ownNumbers: number[];
  }[],
  index: number
) {
  if (index === cardsArray.length - 1) {
    return cardsArray;
  }

  const { gameIndex, ownNumbers, winningNumbers } = cardsArray[index];
  const sum = ownNumbers.reduce(
    (acc, number) => (winningNumbers.includes(number) ? acc + 1 : acc),
    0
  );

  if (sum === 0) {
    return recurse(cardsArray, index + 1);
  }

  const newCards = cardsArray.slice(index + 1, index + sum + 1);
  console.log(newCards.length, index + 1, index + sum + 1);

  return recurse([...cardsArray, ...newCards], index + 1);
}
