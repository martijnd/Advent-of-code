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
  })

  return Math.abs(N) + Math.abs(E)
}

export function part2 (input: string) {
  const data = input.split('\n')
  let shipN = 0
  let shipE = 0

  let wpN = 1
  let wpE = 10
  data.forEach(line => {
    const [action, ...splitAmount] = [...line]
    const amount = Number(splitAmount.join(''))

    if (action !== 'F') {
      [wpN, wpE] = getWayPointLocation(action, amount, [wpN, wpE])
    } else {
      shipN += wpN * amount
      shipE += wpE * amount
    }
  })
  return Math.abs(shipN) + Math.abs(shipE)
}

const getWayPointLocation = (action: string, amount: number, [wpN, wpE]: number[]) => {
  switch (action) {
    case 'N':
      wpN += amount
      break
    case 'E':
      wpE += amount
      break
    case 'S':
      wpN -= amount
      break
    case 'W':
      wpE -= amount
      break
    case 'R':
      [wpN, wpE] = [wpE * -1, wpN]
      if (amount >= 180) {
        [wpN, wpE] = [wpE * -1, wpN]
      }
      if (amount === 270) {
        [wpN, wpE] = [wpE * -1, wpN]
      }
      break
    case 'L':
      [wpE, wpN] = [wpN * -1, wpE]
      if (amount >= 180) {
        [wpE, wpN] = [wpN * -1, wpE]
      }
      if (amount === 270) {
        [wpE, wpN] = [wpN * -1, wpE]
      }
      break
  }

  return [wpN, wpE]
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
    270: 'W'
  }

  return table[(degrees % 360 + (degrees < 0 ? 360 : 0)) % 360]
}
