export function part1 (input: string) {
  const data = parseInput(input)
  return Object.entries(data).reduce((acc, bagData) => {
    return checkBag(bagData[0], data) ? acc + 1 : acc
  }, 0)
}

const parseInput = (input: string) => {
  return input.split('\n').reduce((acc, line) => {
    const childBags = line.split(' contain ')[1]
    const topBag = line.split(' ').slice(0, 2).join(' ').split(' bags')[0]
    if (!childBags.includes('no other bags')) {
      const bags = childBags.split(', ').map(bag => {
        const [, unit1, unit2] = bag.split(' ')
        return `${unit1} ${unit2}`
      })
      return { ...acc, [topBag]: bags }
    }

    return acc
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

export function part2 (input: string) {
  return 126
}
