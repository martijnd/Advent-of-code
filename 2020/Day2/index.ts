
// '1-3 a: abcde'

export function part1(passwords: string[]) {
  return passwords.reduce((total, passwordString) => {
    const split = passwordString.split(' ');
    const minAmount = parseInt(split[0].split('-')[0]);
    const maxAmount = parseInt(split[0].split('-')[1]);
    const letterToAppear = split[1][0];
    const password = split[2];
    const amount = password.split('').reduce((t, char) => {
      return char === letterToAppear ? t + 1 : t;
    }, 0);
    return amount >= minAmount && amount <= maxAmount ? total + 1 : total;
  }, 0)
}

export function part2(passwords: string[]) {
  return passwords.reduce((total, passwordString) => {
    const split = passwordString.split(' ');
    const posA = parseInt(split[0].split('-')[0]) - 1;
    const posB = parseInt(split[0].split('-')[1]) - 1;
    const letterToAppear = split[1][0];
    const password = split[2];

    return !!(password[posA] === letterToAppear) !== 
      !!(password[posB] === letterToAppear)
      ? total + 1 : total;
  }, 0)
}