export function part1(input: string) {
  const data = input.split('\n');
  const numbersDrawn = data[0].split(',').map(Number);

  let boards = getBoards(data).map(splitRows);

  for (let i = 0; i < numbersDrawn.length; i++) {
    const numberDrawn = numbersDrawn[i];
    boards = boards.map((board) => checkBoardForNumber(board, numberDrawn));

    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];
      if (checkRowsForWin(board) || checkColsForWin(board)) {
        return calculateSum(board, numberDrawn);
      }
    }
  }
}

function calculateSum(board: number[][], number: number) {
  let sum = 0;
  for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
    for (let colIndex = 0; colIndex < 5; colIndex++) {
      if (board[rowIndex][colIndex] !== 100) {
        sum += board[rowIndex][colIndex];
      }
    }
  }

  return sum * number;
}

function checkBoardForNumber(board: number[][], number: number) {
  for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
    for (let colIndex = 0; colIndex < 5; colIndex++) {
      if (board[rowIndex][colIndex] === number) {
        board[rowIndex][colIndex] = 100;
      }
    }
  }

  return board;
}

function getBoards(data: string[]) {
  let boards = [];

  for (let i = 2; i < data.length; i += 6) {
    boards.push(data.slice(i, i + 5));
  }

  return boards;
}

function splitRows(board: string[]) {
  return board.map((row) =>
    [
      row.slice(0, 2),
      row.slice(3, 5),
      row.slice(6, 8),
      row.slice(9, 11),
      row.slice(12, 14),
    ]
      .map((num) => num.trim())
      .map(Number)
  );
}

function checkRowsForWin(board: number[][]) {
  let match = false;
  for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
    match = true;
    for (let colIndex = 0; colIndex < 5; colIndex++) {
      if (board[colIndex][rowIndex] !== 100) {
        match = false;
      }
    }
    if (match) {
      return match;
    }
  }
  return false;
}

function checkColsForWin(board: number[][]) {
  let match = false;
  for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
    match = true;
    for (let colIndex = 0; colIndex < 5; colIndex++) {
      if (board[rowIndex][colIndex] !== 100) {
        match = false;
      }
    }

    if (match) {
      return match;
    }
  }

  return false;
}

export function part2(input: string) {
  const data = input.split('\n');
  const numbersDrawn = data[0].split(',').map(Number);

  let boards = getBoards(data).map(splitRows);
  let boardsThatWon = [];
  let winningNumbers = [];

  for (let i = 0; i < numbersDrawn.length; i++) {
    const numberDrawn = numbersDrawn[i];
    boards = boards.map((board) => checkBoardForNumber(board, numberDrawn));

    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];
      if (checkRowsForWin(board) || checkColsForWin(board)) {
        boardsThatWon.push(board);
        winningNumbers.push(numberDrawn);
        boards = boards.filter(cBoard => cBoard[0] !== board[0]);
      }
    }
  }

  return calculateSum(
    boardsThatWon[boardsThatWon.length - 1],
    winningNumbers[winningNumbers.length - 1]
  );
}
