

export function part1(input: string[]) {
  return calc(input, 3, 1);
}

function calc(input: string[], divX: number, divY: number) {
  const XLength = input[0].length;
  const maxYIndex = input.length - 1;

  let x = 0;
  let y = 0;
  let trees = 0;

  function getNextCoord(x: number, y: number) {
    return [(x + divX) % XLength, y + divY]
  }

  while (y <= maxYIndex) {
    if (input[y][x] === '#') {
      trees++;
    }
    [x, y] = getNextCoord(x, y);
  }

  return trees;
}





export function part2(input: string[]) {
  return calc(input, 1, 1) 
  * calc(input, 3, 1) 
  * calc(input, 5, 1) 
  * calc(input, 7, 1)
  * calc(input, 1, 2);
}