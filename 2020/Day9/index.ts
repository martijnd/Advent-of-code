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
