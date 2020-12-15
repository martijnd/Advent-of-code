export function part1 (input: string) {
  let start = input.split(',').map(Number)

  for (let i = start.length; i <= 2020; i++) {
    const one = i - 1
    const last = start[i - 1]
    const two = start.slice(0, -1).length - (start.slice(0, -1).reverse().findIndex(num => num === last)) - 1

    if (!start.slice(0, -1).includes(last)) {
      start = [...start, 0]
    } else {
      start = [...start, one - two]
    }
  }
  return start[start.length - 2]
}

export function part2 (input: string) {

}
