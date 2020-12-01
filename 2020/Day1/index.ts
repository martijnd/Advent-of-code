export function part1(data: number[]) {
  for (let i = 0; i < data.length; i++) {

    for (let j = 0; j < data.length; j++) {
      // console.log(data[i] + data[j]);
      if (data[i] + data[j] === 2020) {
        return data[i] * data[j];
      }
    }
  }
}



// Part 2
export function part2(data: number[]) {
  for (let i = 0; i < data.length; i++) {

    for (let j = 0; j < data.length; j++) {
      for (let k = 0; k < data.length; k++) {
        // console.log(data[i] + data[j]);
        if (data[i] + data[j] + data[k] === 2020) {
          return data[i] * data[j] * data[k];
        }
      }
    }
  }
}
