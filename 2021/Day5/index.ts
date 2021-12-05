export function part1(input: string) {
  const lines = input.split('\n');

  let xMax = 0;
  let yMax = 0;

  const coords = lines.map((line) => {
    const [start, end] = line.split(' -> ');
    const x1 = Number(start.split(',')[0]);
    const y1 = Number(start.split(',')[1]);
    const x2 = Number(end.split(',')[0]);
    const y2 = Number(end.split(',')[1]);
    if (x1 > xMax) {
      xMax = x1;
    }

    if (x2 > xMax) {
      xMax = x2;
    }

    if (y1 > xMax) {
      yMax = y1;
    }
    if (y2 > xMax) {
      yMax = y2;
    }

    return {
      start: [x1, y1],
      end: [x2, y2],
    };
  });

  const board = Array.from(Array(yMax + 1), () => new Array(xMax + 1).fill(0));

  for (let coord of coords) {

    if (coord.start[0] === coord.end[0]) {
      // [5, 1], [5, 6]
      if (coord.start[1] < coord.end[1]) {
        for (let i = coord.start[1]; i <= coord.end[1]; i++) {
          board[i][coord.start[0]] += 1;
        }
      } else {
        // [5, 6], [5, 1]
        for (let i = coord.start[1]; i >= coord.end[1]; i--) {
          board[i][coord.start[0]] += 1;
        }
      }
    }
    if (coord.start[1] === coord.end[1]) {
      // [0, 5], [6, 5]
      if (coord.start[0] < coord.end[0]) {
        for (let i = coord.start[0]; i <= coord.end[0]; i++) {
          board[coord.end[1]][i] += 1;
        }
      } else {
        // [6, 5], [0, 5]
        for (let i = coord.start[0]; i >= coord.end[0]; i--) {
          board[coord.end[1]][i] += 1;
        }
      }
    }
  }

  let finalMax = 0;

  for (let row of board) {
    for (let col of row) {
      if (col > 1) {
        finalMax++;
      }
    }
  }
  return finalMax;
}

export function part2(input: string) {}
