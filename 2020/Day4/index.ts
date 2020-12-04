export function part1 (input: string) {
  const data = formatData(input).reduce((acc, passport) => {
    const keys = Object.fromEntries(passport)
    if (Object.keys(keys).length === 8) {
      return acc + 1
    }

    if (!Object.keys(keys).includes('cid') &&
        Object.keys(keys).length === 7) {
      return acc + 1
    }

    return acc
  }, 0)
  return data
}

export function part2 (input: string) {
  const validationRules: {[key: string]: (value: string) => boolean} = {
    byr: (value: string) => +value >= 1920 && +value <= 2002,
    iyr: (value: string) => +value >= 2010 && +value <= 2020,
    eyr: (value: string) => +value >= 2020 && +value <= 2030,
    hgt: (value: string) => {
      if (value.endsWith('in')) {
        return +value.split('i')[0] >= 59 && +value.split('i')[0] <= 76
      } else {
        return +value.split('c')[0] >= 150 && +value.split('c')[0] <= 193
      }
    },
    hcl: (value: string) => /#[0-9a-f]{6}/.test(value),
    ecl: (value: string) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
    pid: (value: string) => value.length === 9 && !isNaN(parseInt(value)),
    cid: (value: string) => true
  }

  const passports = formatData(input)

  return passports.reduce((acc, passport) => {
    const entriesAmountValid = passport.length === 8 ||
      (passport.length === 7 && !Object.keys(Object.fromEntries(passport)).includes('cid'))

    const entriesValid = passport.reduce((acc, passportEntry) => {
      // console.log(passportEntry)

      if (validationRules[passportEntry[0]](passportEntry[1])) {
        return acc + 1
      }
      return acc
    }, 0)

    if (!Object.keys(Object.fromEntries(passport)).includes('cid')) {
      return entriesValid === 7 && entriesAmountValid ? acc + 1 : acc
    } else {
      return entriesValid === 8 && entriesAmountValid ? acc + 1 : acc
    }
  }, 0)

  // console.log(formatData(input))
}

const formatData = (input: string) =>
  input.split('\n')
    .map(x => x === '' ? '_' : x)
    .join(' ')
    .replace('  ', ' ')
    .split('_')
    .map(entry => entry.trim()
      .split(' ')
      .map(x => x.split(':'))
    )
