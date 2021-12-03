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
  let numbers = input.split('\n')
  let oxygen = ''
  let scrubber = ''

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
      return total1 >= total0 ? number[i] === '1' : number[i] === '0'
    })

    if (numbers.length === 1) break;
  }
  oxygen = numbers[0]
  
  numbers = input.split('\n')
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
      return total1 >= total0 ? number[i] === '0' : number[i] === '1'
    })
    
    if (numbers.length === 1) break;
  }
  scrubber = numbers[0]

  return parseInt(oxygen, 2) * parseInt(scrubber, 2)
}
