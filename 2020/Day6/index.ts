export function part1 (input: string) {
  return formatInput(input).map(person => person.replace(/\n/g, ''))
    .reduce((acc, group) =>
      acc + group.split('').reduce((acc: string[], char) =>
        acc.includes(char) ? acc : [...acc, char], []).length, 0)
}

export function part2 (input: string) {
  return formatInput(input).reduce((acc, group) => {
    const persons = group.split(/\n/)
    return acc + persons[0].split('').reduce((acc, char) =>
      persons.every(person => person.includes(char)) ? acc + 1 : acc, 0)
  }, 0)
}

function formatInput (input: string) {
  return input.split('\n\n')
}
