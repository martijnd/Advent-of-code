export function part1 (input: string) {
  const data = input.split('\n')
  let degrees = 90
  let N = 0
  let E = 0
  data.forEach(line => {
    const [action, ...splitAmount] = [...line]
    const amount = Number(splitAmount.join(''))

    const direction = action === 'F'
      ? getDirection(degrees)
      : action;
    [N, E, degrees] = move(direction, amount, [N, E, degrees])
    // console.log([N, E, degrees])
  })

  return Math.abs(N) + Math.abs(E)
}

export function part2 (input: string) {

}

const move = (direction: string, amount: number, currentPos: number[]) => {
  let [N, E, degrees] = currentPos
  switch (direction) {
    case 'N':
      N += amount
      break
    case 'E':
      E += amount
      break
    case 'S':
      N -= amount
      break
    case 'W':
      E -= amount
      break
    case 'R':
      degrees += amount
      break
    case 'L':
      degrees -= amount
      break
  }

  return [N, E, degrees]
}

const getDirection = (degrees: number) => {
  const table: {[key: number]: string} = {
    0: 'N',
    90: 'E',
    180: 'S',
    270: 'W',
    360: 'N'
  }

  return table[(degrees % 360 + (degrees < 0 ? 360 : 0)) % 360]
}
