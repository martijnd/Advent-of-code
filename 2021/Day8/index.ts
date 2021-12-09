export function part1(input: string) {
  const values = input.split('\n');

  return values.reduce((total, value) => {
    const digits = value.split(' | ')[1].split(' ');

    const lengths = [2, 3, 4, 7];
    let sum = 0;

    digits.forEach((digit) => {
      if (lengths.includes(digit.length)) {
        sum++;
      }
    });

    return total + sum;
  }, 0);
}

export function part2(input: string) {}
