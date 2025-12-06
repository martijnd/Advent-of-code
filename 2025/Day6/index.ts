export function part1(input: string) {
  const rows = input.split('\n');
  const operatorList = rows.at(-1)?.match(/[\*\+]{1}/g)!;
  const data = rows.map((row) => row.match(/\d+/g)).filter(Boolean);

  const resultSet = [];
  for (let i = 0; i < data[0]!.length; i++) {
    const arr = [];
    for (let j = 0; j < data.length; j++) {
      arr.push(data[j]![i]);
    }
    resultSet.push(arr);
  }

  return resultSet.reduce((total, curr, i) => {
    const operator = operatorList[i];
    if (operator === '+') {
      return total + curr.map(Number).reduce((acc, c) => acc + c, 0);
    } else {
      return total + curr.map(Number).reduce((acc, c) => acc * c, 1);
    }
  }, 0);
}

export function part2(input: string) {
  const rows = input.split('\n');

  const columnLength = rows[0].length;
  let result = 0;

  let numbers = [];
  for (let i = columnLength - 1; i >= 0; i--) {
    let number = '';
    let operator = '';

    for (let j = 0; j < rows.length; j++) {
      const currentCharacter = rows[j][i];
      if (currentCharacter === ' ') {
        continue;
      }

      if (['*', '+'].includes(currentCharacter)) {
        operator = currentCharacter;
        continue;
      }

      if (currentCharacter) {
        number += currentCharacter;
      }
    }
    numbers.push(number);

    if (operator) {
      const cleanedNumbers = numbers.filter(Boolean).map(Number);
      // console.log({ cleanedNumbers });
      result +=
        operator === '+'
          ? cleanedNumbers.reduce((acc, curr) => acc + curr, 0)
          : cleanedNumbers.reduce((acc, curr) => acc * curr, 1);
      numbers = [];
    }
  }

  return result;
}
