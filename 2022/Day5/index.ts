export function part1(input: string) {
  const [A, B] = input.split('\n\n');
  const rows = A.split('\n');
  const instructions = B.split('\n');
  const numberOfCols = Number(rows.at(-1)?.trim().at(-1));

  let collection = Array.from(Array(numberOfCols), () => [] as string[]);
  for (let colIndex = 0; colIndex <= numberOfCols - 1; colIndex++) {
    rows.slice(0, -1).forEach((row, rowIndex) => {
      const char = row[1 + colIndex * 4];
      if (char !== ' ') {
        collection[colIndex].push(char);
      }
    });
  }

  for (const instruction of instructions) {
    const { amount, from, to } = parseInstructions(instruction);
    for (let i = 0; i < amount; i++) {
      const moving = collection[from - 1].shift()!;
      collection[to - 1] = [moving, ...collection[to - 1]];
    }
  }
  return collection.reduce((acc, col) => acc + col[0], '');
}

function parseInstructions(instruction: string) {
  const [, amount, , from, , to] = instruction.split(' ');

  return { amount: Number(amount), from: Number(from), to: Number(to) };
}

export function part2(input: string) {}
