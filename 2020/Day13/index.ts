export function part1 (input: string) {
  const [time, busIdsAsString] = input.split('\n')
  const correctId = busIdsAsString.split(',').filter(Number).map(Number)
    .reduce((acc, id) => +time % id > acc ? id : acc, 0)

  return correctId * Math.ceil(+time / correctId) * correctId % +time
}
