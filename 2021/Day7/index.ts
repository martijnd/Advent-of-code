export function part1 (input: string) {
  const crabSubmarines = input.split(',').map(Number);
  
  let min = Infinity;

  crabSubmarines.forEach((number, idx) => {
    const crabSubmarinesFiltered = crabSubmarines.filter((_, idx2) => idx2 !== idx);
    const sum = crabSubmarinesFiltered.reduce((acc, curr) => acc + Math.abs(number - curr), 0)
    if (sum < min) {
      min = sum;
    } 

  }, Infinity)
  
  return min;
}

export function part2 (input: string) {
  const crabSubmarines = input.split(',').map(Number);
  
  let min = Infinity;
  
  for (let i = 0; i < Math.max(...crabSubmarines); i++) {
    const sum = crabSubmarines.reduce((acc, curr) => acc + sum2(Math.abs(i - curr)), 0);

    if (sum < min) {
      min = sum;
    }  
  
  }  
  
  return min;
}

function sum2 (num: number) {
    let sum = 0;
    for (let i = 1; i <= num; i++) {
      sum += i;
    }

    return sum;
}
