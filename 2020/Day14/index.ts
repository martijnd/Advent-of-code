export function part1 (input: string) {
  const data = input.split('\n')
  console.log(data)

  let mask = ''
  let dataa: {[key: string]:  } = {}

  data.forEach(line => {
    if (line.startsWith('mask')) {
      mask = line.split(' = ')[1]
    }
    if (line.startsWith('mem')) {
      const [, address, amount] = line.match(/\[(\d+)\]\s=\s(\d+)/) as string[]
      console.log(amount)
      data[address] = 
    }
  })
}

export function part2 (input: string) {

}
