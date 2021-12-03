export function part1 (input: string): number {
  let count = 0
  input.split('\n').map(Number).forEach((num, index, data) => {
    if (index > 0) {
      if (num > data[index - 1]) {
        count++
      }
    }
  })

  return count
}

export function part2 (input: string): number {
  let count = 0
  input.split('\n').map(Number).forEach((num, index, data) => {
    if (index > 2) {
      const currTotal = num + data[index - 1] + data[index - 2]
      const prevTotal = data[index - 1] + data[index - 2] + data[index - 3]
      if (currTotal > prevTotal) {
        count++
      }
    }
  })

  return count
}
