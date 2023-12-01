export function part1(data: string) {
  return data.split('\n').reduce((acc, curr) => {
    let sum = '';
    for (const char of curr.split('')) {
      if (!isNaN(Number(char))) {
        sum += char;
        break;
      }
    }

    for (const char of curr.split('').reverse()) {
      if (!isNaN(Number(char))) {
        sum += char;
        break;
      }
    }
    return acc + Number(sum);
  }, 0);
}
