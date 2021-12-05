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

export function part2(input: string) {
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
    console.log(coord)
    const allCoords= getAllCoords(coord);
    console.log(allCoords);
    allCoords.forEach(([x, y]) => {
      board[y][x] += 1
    });
    // if (coord.start[0] === coord.end[0]) {
    //   // [5, 1], [5, 6]
    //   if (coord.start[1] < coord.end[1]) {
    //     for (let i = coord.start[1]; i <= coord.end[1]; i++) {
    //       board[i][coord.start[0]] += 1;
    //     }
    //   } else {
    //     // [5, 6], [5, 1]
    //     for (let i = coord.start[1]; i >= coord.end[1]; i--) {
    //       board[i][coord.start[0]] += 1;
    //     }
    //   }
    // }
    // if (coord.start[1] === coord.end[1]) {
    //   // [0, 5], [6, 5]
    //   if (coord.start[0] < coord.end[0]) {
    //     for (let i = coord.start[0]; i <= coord.end[0]; i++) {
    //       board[coord.end[1]][i] += 1;
    //     }
    //   } else {
    //     // [6, 5], [0, 5]
    //     for (let i = coord.start[0]; i >= coord.end[0]; i--) {
    //       board[coord.end[1]][i] += 1;
    //     }
    //   }
    // }

    // if (
    //   coord.start[0] === coord.end[1] && coord.start[1] === coord.end[0]
    // ) {
    //   const start = Object.values(coord).sort((a, b) => a[0] - b[0])
    //   console.log(start)
    //   for (let i = start[0][0]; i <= start[1][0]; i++) {
    //     // console.log([i, coord.start[0] - i])
    //     board[coord.start[0] - i][i] += 1;
    //   }
    // }

    // if (coord.start[0] - coord.start[1] === coord.end[0] - coord.end[1]
    //   && !(coord.start[0] === coord.start[1] && coord.end[0] === coord.end[1])) {
    //     const start = Object.values(coord).sort((a, b) => a[0] - b[0]);
    //     for (let i = 0; i <= start[1][1]; i++) {
    //       board[start[0][1] + i][start[0][0] + i] += 1;
    //     }
    // }

    // if (Math.abs(coord.start[0] - coord.end[0]) === Math.abs(coord.start[1] - coord.end[1])
    // && !(coord.start[0] === coord.start[1] && coord.end[1] === coord.end[0])
    // && !(coord.start[0] === coord.end[1] && coord.start[1] === coord.end[0])) {
    //   for (let i = coord.end[0]; i >= coord.start[1]; i--) {
    //     // i = 0, y = 2
    //     // i = 5, y = 5
    //     console.log([i, ])
    //     board[i][i - coord.start[1] + coord.end[1]] += 1;
    //   }
    // }
    
    // if (coord.start[0] === coord.start[1] && coord.end[0] === coord.end[1]) {
    //   // console.log(coord)
    //   for (let i = coord.start[0]; i <= coord.end[0]; i++) {
    //     board[i][i] += 1;
    //   }
    // }
    console.log(board.map(row => row.join('')).join("\n").replace(/0/g, '.'));
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


function getAllCoords({start, end}: {start: number[], end: number[]}) {
  function slope(a: number[], b: number[]) {
    return (b[1] - a[1]) / (b[0] - a[0]);
  }
  
  function intercept(point: number[], slope: number) {
    if (slope === null) {
        // vertical line
        return point[0];
    }
  
    return point[1] - slope * point[0];
  }
  
  const m = slope(start, end);
  const b = intercept(start, m);
  
  let coordinates = [];
  for (let x = start[0]; x <= end[0]; x++) {
    let y = x + b;
    coordinates.push([x, y]);
  }

  return coordinates;
}
