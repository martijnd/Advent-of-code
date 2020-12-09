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

  const data = input.split('\n').map(num => +num)

  const validNumbers = data.filter(num => num < goldenNumber)

  let count = 0
  for (const number of validNumbers) {
    let collection: number[] = [number]
    for (const nestedNumber of validNumbers.slice(count)) {
      const sum = collection.reduce((acc, x) => acc + x, 0)
      if (number === nestedNumber) {
        continue
      }
      if (sum + nestedNumber > goldenNumber) {
        continue
      }

      if (sum + nestedNumber === goldenNumber) {
        const total = [...collection, nestedNumber]

        return Math.min(...total) + Math.max(...total)
      }

      if (sum + nestedNumber < goldenNumber) {
        collection = [...collection, nestedNumber]
      }
    }
    count++
  }
}
