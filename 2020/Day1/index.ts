// export function part1(data: number[]) {
//   for (let i = 0; i < data.length; i++) {
//     for (let j = 0; j < data.length; j++) {
//       // console.log(data[i] + data[j]);
//       if (data[i] + data[j] === 2020) {
//         return data[i] * data[j];
//       }
//     }
//   }
// }

export function part1(data: number[]) {
  let ans;
  data.map(i => {
    data.map(j => {
      if (i + j === 2020) {
        ans = i * j;
      }
    })
  })

  return ans;
}



// Part 2
export function part2(data: number[]) {
  let ans;
  data.map(i => {
    data.map(j => {
      data.map(k => {
        if (i + j + k === 2020) {
          ans = i * j * k;
        }
      })
    })
  })
  return ans;
}
