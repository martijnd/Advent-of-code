export function part1(input: string) {
  const board = input.split('\n').map((line) => line.split(''));
  let matches = 0;

  board.forEach((line, i) => {
    line.forEach((char, j) => {
      if (char === 'X') {
        [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ].forEach(([X, Y]) => {
          const coordX = j + X;
          const coordY = i + Y;
          if (board[coordY]?.[coordX] === undefined) {
            return;
          }
          if (board[coordY]?.[coordX] === 'M') {
            if (board[coordY + Y]?.[coordX + X] === 'A') {
              if (board[coordY + Y * 2]?.[coordX + X * 2] === 'S') {
                matches++;
              }
            }
          }
        });
      }
    });
  });

  return matches;
}

export function part2(input: string) {
  const board = input.split('\n').map((line) => line.split(''));
  let matches = 0;

  board.forEach((line, i) => {
    line.forEach((char, j) => {
      if (char === 'A') {
        if (
          (board[i - 1]?.[j - 1] === 'M' && // M S
            board[i + 1]?.[j - 1] === 'M' && // M S
            board[i - 1]?.[j + 1] === 'S' &&
            board[i + 1]?.[j + 1] === 'S') ||
          (board[i - 1]?.[j - 1] === 'S' && // S M
            board[i + 1]?.[j - 1] === 'S' && // S M
            board[i - 1]?.[j + 1] === 'M' &&
            board[i + 1]?.[j + 1] === 'M') ||
          (board[i - 1]?.[j - 1] === 'M' && // M M
            board[i + 1]?.[j - 1] === 'S' && // S S
            board[i - 1]?.[j + 1] === 'M' &&
            board[i + 1]?.[j + 1] === 'S') ||
          (board[i - 1]?.[j - 1] === 'S' && // S S
            board[i + 1]?.[j - 1] === 'M' && // M M
            board[i - 1]?.[j + 1] === 'S' &&
            board[i + 1]?.[j + 1] === 'M')
        ) {
          console.log(i, j);
          matches++;
        }
      }
    });
  });

  return matches;
}
