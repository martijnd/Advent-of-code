function getRow (input: string) {
  return calcPosition(0, 127, 'F', 'B', input)
}

function getColumn (input: string) {
  return calcPosition(0, 7, 'L', 'R', input)
}

// Imagine realising that it is binary...
function calcPosition (min: number, max: number, minChar: string, maxChar: string, data: string) {
  return data.split('').reduce((_, pos) => {
    const diff = max - min - 1
    if (pos === minChar) {
      max = min + diff / 2
    }
    if (pos === maxChar) {
      min = min + diff / 2 + 1
    }

    return min
  }, 0)
}

export function part1 (input: string) {
  return input.split('\n').reduce((acc, seatCode) => {
    const result = getSum(seatCode)
    return result > acc ? result : acc
  }, 0)
}
export function getSum (input: string) {
  return getRow(input) * 8 + getColumn(input)
}

export function part2 (input: string) {
  const seats = input.split('\n')

  const getEmptyRow = () => Array.from({ length: 8 }, () => 'O')

  const map: string[][] = Array.from({ length: 128 }, () => getEmptyRow())
  seats.forEach(seatString => {
    map[getRow(seatString)][getColumn(seatString)] = 'X'
  })

  for (let row = 0; row < 128; row++) {
    if (
      !map[row].every(val => val === 'O') &&
      map[row - 1].every(val => val === 'X') &&
      map[row + 1].every(val => val === 'X')
    ) {
      for (let col = 0; col < 8; col++) {
        if (map[row][col] === 'O') {
          return row * 8 + col
        }
      }
    }
  }
}
