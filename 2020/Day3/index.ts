function calc (input: string[], slope: number[]) {
  const [divX, divY] = slope
  const XLength = input[0].length
  const YLength = input.length

  let x = 0
  let y = 0
  let trees = 0

  const getNextCoord = (x: number, y: number) => [(x + divX) % XLength, y + divY]

  while (y < YLength) {
    if (input[y][x] === '#') {
      trees++
    }

    [x, y] = getNextCoord(x, y)
  }

  return trees
}

export function part1 (input: string[]) {
  return calc(input, [3, 1])
}

export function part2 (input: string[]) {
  return [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ].reduce((acc, slope) => acc * calc(input, slope), 1)
}
