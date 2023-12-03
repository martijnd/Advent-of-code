export function part1(input: string) {
  const data = input.split('\n');
  console.log(
    data.map(findNumberRange).map((line) => {
      line.map((number) => {
        const length = number.number.length;

        for (let i = 0; i < length; i++) {}
      });
    })
  );
}

function findNumberRange(line: string, index: number) {
  const regex = new RegExp(/\d+/g);
  const output = line.match(regex);
  return (
    output?.map((result) => {
      const startIndex = line.indexOf(result);
      const number = result;

      return { startIndex, number, line: index };
    }) ?? []
  );
}

export function part2(input: string) {}
