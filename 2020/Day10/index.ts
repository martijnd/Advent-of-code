import { rootCertificates } from 'tls'

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
  const data = input.split('\n').map(Number).sort((a, b) => a - b)

  const fullData = [0, ...data, data[data.length - 1] + 3]
  console.log(fullData)
  let numbers: number[] = []
  let numbersSS: number[][] = []
  return fullData.reduce((acc, number) => {
    const options = [1, 2, 3].reduce((no, num) =>
      fullData.includes(number + num) ? no + 1 : no, 0)
    numbers = [...numbers, number]
    numbersSS = [...numbersSS, numbers]
    console.log(numbersSS.join('\n'))
    return options > 0 ? acc * options : acc
  }, 1)
}

// function reachesEnd (isPossible: boolean, data: number[], currentIndex: number): boolean | undefined {
//   if (currentIndex === data.length - 1 || isPossible) {
//     return true
//   }

//   if ([1, 2, 3].includes(data[currentIndex + 1] - data[currentIndex])) {
//     return reachesEnd(isPossible, data, currentIndex + 1)
//   }

//   return false
// }
