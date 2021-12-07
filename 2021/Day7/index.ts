export function part1 (input: string) {
  const crabSubmarines = input.split(',').map(Number);
  
  let max = Infinity;
  
  crabSubmarines.forEach((number, idx) => {
    const crabSubmarinesFiltered = crabSubmarines.filter((_, idx2) => idx2 !== idx);
    const sum = crabSubmarinesFiltered.reduce((acc, curr) => acc + Math.abs(number - curr), 0)
    if (sum < max) {
      max = sum;
    } 

  }, Infinity)
  
  return max;
}

export function part2 (input: string) {

}
