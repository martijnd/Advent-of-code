export function part1 (input: string) {
  return getPassports(input).reduce((acc, passport) => {
    const passwordObj = Object.fromEntries(passport)
    if (Object.keys(passwordObj).length === 8) {
      return acc + 1
    }

    if (!Object.keys(passwordObj).includes('cid') &&
        Object.keys(passwordObj).length === 7) {
      return acc + 1
    }

    return acc
  }, 0)
}

export function part2 (input: string) {
  const passports = getPassports(input)

  const validationRules: {[key: string]: (value: string) => boolean} = {
    byr: (value: string) => +value >= 1920 && +value <= 2002,
    iyr: (value: string) => +value >= 2010 && +value <= 2020,
    eyr: (value: string) => +value >= 2020 && +value <= 2030,
    hgt: (value: string) => {
      if (value.endsWith('in')) {
        return +value.split('in')[0] >= 59 && +value.split('in')[0] <= 76
      } else {
        return +value.split('cm')[0] >= 150 && +value.split('cm')[0] <= 193
      }
    },
    hcl: (value: string) => /^#[0-9a-f]{6}$/.test(value),
    ecl: (value: string) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
    pid: (value: string) => value.length === 9 && !isNaN(parseInt(value)),
    cid: (value: string) => true
  }

  return passports.reduce((acc, passport) => {
    const validEntries = passport.reduce((acc, passportEntry) => {
      const [key, value] = passportEntry
      return validationRules[key](value) ? acc + 1 : acc
    }, 0)

    const neededValidEntries = (!Object.keys(Object.fromEntries(passport)).includes('cid') ? 7 : 8)
    const numberOfValidEntries = validEntries === neededValidEntries
    const entriesAllValid = (passport.length === 8 ||
      (passport.length === 7 && !Object.keys(Object.fromEntries(passport)).includes('cid')))

    return numberOfValidEntries && entriesAllValid ? acc + 1 : acc
  }, 0)
}

const getPassports = (input: string) =>
  input.split('\n')
    .map(x => x === '' ? '_' : x)
    .join(' ')
    .replace('  ', ' ')
    .split('_')
    .map(entry => entry.trim()
      .split(' ')
      .map(x => x.split(':'))
    )
