export function part1 (input: string) {
  let data = input.split('\n').map(y => [...y])
  // console.log(data)

  let changes = 999
  let count = 0
  while (changes !== 0 && count < 50) {
    [changes, data] = iterate(data)
    count++
  }

  return (data.map(line => line.join('')).join('').match(/#/g) || []).length
}

function iterate (original: string[][]): [number, string[][]] {
  const relativeCoords = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
  let changes = 0
  let result: string[][] = []

  original.forEach((line, i) => {
    let newLine: string[] = []
    line.forEach((char, j) => {
      const count = relativeCoords.reduce((acc, [x1, y1]) => {
        if (original[i + y1] !== undefined && original[i + y1][j + x1] !== undefined) {
          if (original[i + y1][j + x1] === '#') {
            return acc + 1
          }
        }
        return acc
      }, 0)

      if (char === '.') {
        newLine = [...newLine, '.']
      } else if (count === 0 && char !== '#') {
        newLine = [...newLine, '#']
        changes++
      } else if (count >= 4 && char !== 'L') {
        newLine = [...newLine, 'L']
        changes++
      } else {
        newLine = [...newLine, char]
      }
    })
    result = [...result, newLine]
  })

  return [changes, result]
}

export function part2 (input: string) {

}
