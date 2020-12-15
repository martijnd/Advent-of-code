export function part1 (input: string) {
  return calculate(input, 2020)
}

function calculate (input: string, position: number) {
  const data = input.split(',').map(Number)

  const indexMap = new Map<number, number>(
    data.map((value, index) => [value, index])
  )
  let lastValue = data[data.length - 1]
  for (let i = data.length; i < position; ++i) {
    const lastIndex = i - 1
    const nextValue = lastIndex - (indexMap.get(lastValue) ?? lastIndex)
    indexMap.set(lastValue, lastIndex)
    lastValue = nextValue
  }

  return lastValue
}

export function part2 (input: string) {
  return calculate(input, 30000000)
}
