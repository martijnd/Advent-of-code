export function part1(input: string) {
  const banks = input.split('\n');
  let total = 0;

  banks.forEach((bank) => {
    let max = 0;
    for (let i = 0; i < bank.length; i++) {
      for (let j = i + 1; j < bank.length; j++) {
        const char1 = bank[i];
        const char2 = bank[j];

        if (Number(char1 + char2) > max) {
          max = Number(char1 + char2);
        }
      }
    }

    total += max;
  });

  return total;
}

export function part2(input: string) {
  return input.split('\n').reduce((acc, bank) => acc + getScore(bank), 0);
}

function getScore(bank: string) {
  let index = 0;

  let result = '';
  const numArray = bank.split('').map(Number);
  for (let remaining = 11; remaining >= 0; remaining--) {
    const scopedArray = numArray.slice(index, bank.length - remaining);
    const maxNumber = Math.max(...scopedArray);
    const localIndex = scopedArray.indexOf(maxNumber);
    index += localIndex + 1;
    result += maxNumber.toString();
  }

  return parseInt(result);
}
