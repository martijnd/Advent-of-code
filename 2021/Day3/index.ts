export function part1(input: string) {
  const numbers = input.split('\n')
  let gamma = ''
  let epsilon = ''
  for (let i = 0; i < numbers[0].length; i++) {
    let total1 = 0
    let total0 = 0
    numbers.forEach((number) => {
      if (number[i] === '1') {
        total1++
      } else {
        total0++
      }
    })

    if (total1 > total0) {
      gamma += '1'
      epsilon += '0'
    } else {
      gamma += '0'
      epsilon += '1'
    }
  }
  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

export function part2(input: string) {
  return (
    calculate(input.split('\n'), true) * calculate(input.split('\n'), false)
  )
}

function calculate(numbers: string[], yes: boolean): number {
  for (let i = 0; i < numbers[0].length; i++) {
    let total1 = 0
    let total0 = 0
    numbers.forEach((number) => {
      if (number[i] === '1') {
        total1++
      } else {
        total0++
      }
    })

    numbers = numbers.filter((number) => {
      if (yes) {
        return total1 >= total0 ? number[i] === '1' : number[i] === '0'
      }

      return total1 >= total0 ? number[i] === '0' : number[i] === '1'
    })

    if (numbers.length === 1) return parseInt(numbers[0], 2)
  }

  return 0
}
