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

export function part2(data: string) {
  const map = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  } as Record<string, number>;

  const matches = Object.keys(map).map(String);

  return data.split('\n').reduce((acc, line) => {
    let lowest = Infinity;
    let word = '';
    matches.forEach((match) => {
      const index = line.indexOf(match);
      if (index >= 0 && index < lowest) {
        lowest = index;
        word = match;
      }
    });
    let highest = -1;
    let word2 = '';
    matches.forEach((match) => {
      const index = line.lastIndexOf(match);
      if (index >= 0 && index > highest) {
        highest = index;
        word2 = match;
      }
    });
    return acc + Number(map[word].toString() + map[word2].toString());
  }, 0);
}
