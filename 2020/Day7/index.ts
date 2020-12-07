export function part1 (input: string) {
  const data = parseInput(input)
  return Object.entries(data).reduce((acc, bagData) => {
    return checkBag(bagData[0], data) ? acc + 1 : acc
  }, 0)
}

const parseInput = (input: string) => {
  return input.split('\n').reduce((acc, line) => {
    const childBags = line.split(' contain ')[1]
    return childBags.includes('no other bags')
      ? acc
      : {
          ...acc,
          [line.split(' bags')[0]]: childBags.split(', ')
            .map(bag => `${bag.split(' ')[1]} ${bag.split(' ')[2]}`)
        }
  }, {})
}

const checkBag = (bagx: string, input: {[key: string]: string[]}): boolean => {
  if (input[bagx]?.length) {
    if (input[bagx].includes('shiny gold')) {
      return true
    } else {
      return input[bagx].some(bag => checkBag(bag, input))
    }
  }
  return false
}

const parseInputWithAmount = (input: string) => {
  return input.split('\n').reduce((acc, line) => {
    const childBags = line.split(' contain ')[1]
    const topBag = line.split(' ').slice(0, 2).join(' ').split(' bags')[0]
    return childBags.includes('no other bags')
      ? acc
      : {
          ...acc,
          [topBag]: childBags.split(', ').map(bag => {
            const [amount, unit1, unit2] = bag.split(' ')
            return [+amount, `${unit1} ${unit2}`]
          })
        }
  }, {})
}

export function part2 (input: string) {
  // Start the recursive loop
  return getAmount('shiny gold', Object.entries(parseInputWithAmount(input)))
}

function getAmount (bagName: string, input: [string, unknown][]): number {
  const bagEntry = input.find(([bag]) => bag === bagName)
  // If no bags are found, no bags are inside the current bag
  if (!bagEntry) return 0
  const [, childBags] = bagEntry
  return (childBags as string[])
    .reduce((acc, bag) => acc + +bag[0] + +bag[0] * getAmount(bag[1], input), 0)
}
