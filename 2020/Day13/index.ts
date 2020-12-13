export function part1 (input: string) {
  const [time, busIdsAsString] = input.split('\n')
  const correctId = busIdsAsString.split(',').filter(Number).map(Number)
    .reduce((acc, id) => +time % id > acc ? id : acc, 0)

  return correctId * Math.ceil(+time / correctId) * correctId % +time
}

export function part2 (input: string, ans: number) {
  const busIds = input.split(',')
  let startTime = ans + (Math.ceil(ans / +busIds[0]) * +busIds[0] % ans) - 1

  let found = false

  while (!found) {
    startTime++
    found = busIds.every((busId, index) => {
      if (busId === 'x') return true
      return (startTime + index) % +busId === 0
    })
  }

  return startTime
}
