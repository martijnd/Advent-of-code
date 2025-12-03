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

export function part2(input: string) {}
