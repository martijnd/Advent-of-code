export function part1 (input: string) {
  let data = input.split('\n').map(y => [...y])
  // console.log(data)

  let changes = 999
  while (changes !== 0) {
    [changes, data] = iterate(data)
    console.log(data.map(line => line.join('')).join('\n'))
  }

  return (data.map(line => line.join('')).join('').match(/#/g) || []).length
}

function iterate (original: string[][]): [number, string[][]] {
  const relativeCoords = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
  let changes = 0
  const result = [...original]

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      if (original[i][j] === '.') {
        result[i][j] = '.'
      }
      const count = relativeCoords.reduce((acc, [x1, y1]) => {
        if (original[i + y1] !== undefined && original[i + y1][j + x1] !== undefined) {
          if (original[i + y1][j + x1] === '#') {
            return acc + 1
          }
        }
        return acc
      }, 0)

      if (count === 0 && original[i][j] !== '#') {
        result[i][j] = '#'
        changes++
      }
      if (count >= 4 && original[i][j] !== 'L') {
        result[i][j] = 'L'
        changes++
      }
    }
  }

  return [changes, result]
}

export function part2 (input: string) {

}
