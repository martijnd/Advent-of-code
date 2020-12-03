export function part1 (data: number[]) {
  let ans
  data.forEach(i => {
    data.forEach(j => {
      if (i + j === 2020) {
        ans = i * j
      }
    })
  })

  return ans
}

// Part 2
export function part2 (data: number[]) {
  let ans
  data.forEach(i => {
    data.forEach(j => {
      data.forEach(k => {
        if (i + j + k === 2020) {
          ans = i * j * k
        }
      })
    })
  })
  return ans
}
