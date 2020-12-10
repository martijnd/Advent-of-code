export function part1 (input: string) {
  const data = input.split('\n').map(Number).sort((a, b) => a - b)

  let previousNumber = 0
  let amountOf3 = 0
  let amountOf1 = 0
  data.forEach(number => {
    if (number - previousNumber === 1) {
      amountOf1++
    }
    if (number - previousNumber === 3) {
      amountOf3++
    }
    previousNumber = number
  })

  return amountOf1 * (amountOf3 + 1)
}

export function part2 (input: string) {

}
