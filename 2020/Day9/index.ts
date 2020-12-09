export function part1 (input: string, preambleSize: number) {
  const data = input.split('\n').map(num => +num)
  let ans = 0
  data.slice(preambleSize, data.length).forEach((number, index) => {
    let found = false
    for (let i = index; i < index + preambleSize; i++) {
      for (let j = index; j < index + preambleSize; j++) {
        if (i === j) {
          break
        }

        if (data[i] + data[j] === number) {
          found = true
        }
      }
    }
    if (!found) {
      ans = number
    }
  }, 0)

  return ans
}

export function part2 (input: string, preambleSize: number) {
  const goldenNumber = part1(input, preambleSize)

  const validNumbers = input.split('\n')
    .map(num => +num)
    .filter(num => num < goldenNumber)

  return validNumbers.reduce((ans, number, index) => {
    let collection: number[] = [number]
    for (const nestedNumber of validNumbers.slice(index)) {
      const sum = collection.reduce((acc, x) => acc + x, 0)
      if (sum + nestedNumber > goldenNumber || number === nestedNumber) {
        continue
      }

      if (sum + nestedNumber < goldenNumber) {
        collection = [...collection, nestedNumber]
      }

      if (sum + nestedNumber === goldenNumber) {
        const total = [...collection, nestedNumber]

        return Math.min(...total) + Math.max(...total)
      }
    }

    return ans
  }, 0)
}
