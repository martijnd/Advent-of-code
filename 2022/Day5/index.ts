export function part1(input: string) {
  const [state, instructions] = parse(input);

  instructions.forEach((instruction) => {
    const { amount, from, to } = parseInstructions(instruction);
    for (let i = 0; i < amount; i++) {
      const moving = state[from - 1].shift()!;
      state[to - 1] = [moving, ...state[to - 1]];
    }
  });
  return state.reduce((total, [head]) => total + head, '');
}

function parse(input: string): [string[][], string[]] {
  const [rows, instructions] = input
    .split('\n\n')
    .map((data) => data.split('\n'));
  const numberOfCols = Number(rows.at(-1)?.trim().at(-1));

  const collection = Array.from(Array(numberOfCols), () => [] as string[]);
  for (let colIndex = 0; colIndex <= numberOfCols - 1; colIndex++) {
    rows
      // Skip last
      .slice(0, -1)
      .forEach((row) => {
        const index = 1 + colIndex * 4;
        const char = row[index];
        if (char !== ' ') {
          collection[colIndex] = [...collection[colIndex], char];
        }
      });
  }

  return [collection, instructions];
}

function parseInstructions(instruction: string) {
  const [, amount, , from, , to] = instruction.split(' ').map(Number);
  return { amount, from, to };
}

export function part2(input: string) {
  const [state, instructions] = parse(input);

  instructions.forEach((instruction) => {
    const { amount, from, to } = parseInstructions(instruction);
    const moving = state[from - 1].splice(0, amount);
    state[to - 1] = [...moving, ...state[to - 1]];
  });

  return state.reduce((total, [head]) => total + head, '');
}
