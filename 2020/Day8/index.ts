export function part1 (input: string) {
  const data = input.split('\n').map(line => line.split(' '))
  let index = 0
  let acc = 0
  let passedIndexes: number[] = []

  while (!passedIndexes.includes(index)) {
    passedIndexes = [...passedIndexes, index]
    const newData = processAction(data[index], acc, index)
    acc = newData[0]
    index = newData[1]
  }

  return acc
}

function processAction ([action, amount]: string[], acc: number, index: number) {
  switch (action) {
    case 'acc':
      index++
      acc += +amount
      break
    case 'jmp':
      index += +amount
      break
    case 'nop':
      index++
  }

  return [acc, index]
}

export function part2 (input: string) {
  const rows = input.split('\n').length
  const jmpCount = (input.match(/jmp/g) || []).length

  for (let i = 0; i < jmpCount; i++) {
    let acc = 0
    let countedJmp = 0
    let newInput = input.split('\n')
    newInput = newInput.map(line => {
      if (line.split(' ')[0] === 'jmp') {
        countedJmp++
        if (countedJmp === i + 1) {
          return ['nop', line.split(' ')[1]].join(' ')
        }
      }

      return line
    })

    let index = 0
    let prevIndex = 0
    let count = 0
    while (index !== rows && count < 1000) {
      count++
      const newData = processAction(newInput.map(line => line.split(' '))[index], acc, index)
      acc = newData[0]
      index = newData[1]
      if (index === prevIndex) {
        break
      }
      prevIndex = index
    }

    if (index >= rows) {
      return acc
    }
  }
}
