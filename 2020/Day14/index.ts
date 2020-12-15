export function part1 (input: string) {
  let mask = ''

  return Object.values(input.split('\n').reduce((result, line) => {
    if (line.startsWith('mask')) {
      mask = line.split(' = ')[1]
      return result
    } else {
      const [, address, amount] = line.match(/\[(\d+)\]\s=\s(\d+)/) as string[]
      return {
        ...result,
        [address]: (+amount >>> 0)
          .toString(2)
          .padStart(36, '0').split('').reduce((acc, char, index) =>
            acc + (mask[index] === 'X' ? char : mask[index]), '')
      }
    }
  }, {} as {[key: string]: string}))
    .reduce((acc, num) => acc + parseInt(num, 2), 0)
}

export function part2 (input: string) {
//   const data = input.split('\n')

  //   let mask = ''
  //   const result: {[key: string]: string} = {}
  //   data.forEach(line => {
  //     if (line.startsWith('mask')) {
  //       mask = line.split(' = ')[1]
  //       return result
  //     } else {
  //       const [, address, amount] = line.match(/\[(\d+)\]\s=\s(\d+)/) as string[]
  //       (+amount >>> 0)
  //         .toString(2)
  //         .padStart(36, '0').split('').forEach((char, index) => {
  //           if (mask[index] === 'X') {

//           } else if (mask[index])
//         })
//     }
//   })
}
