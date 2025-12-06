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

export function part2(input: string) {}
