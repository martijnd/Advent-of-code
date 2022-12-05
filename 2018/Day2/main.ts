import { data } from './input'

function countOccurences (input: string) {
  let hasTwo = false
  let hasThree = false

  const chars = 'abcdefghijklmnopqrstuvwxyz'

  chars.split('').forEach(char => {
    const regex = new RegExp(char, 'g')
    const amount = (input.match(regex) || []).length
    if (amount === 2) {
      hasTwo = true
    } else if (amount === 3) {
      hasThree = true
    }
  })

  return { hasTwo, hasThree }
}

export const partOne = (input: string[]): number => {
  let twoTotal = 0
  let threeTotal = 0
  input.forEach(singleString => {
    const result = countOccurences(singleString)
    if (result.hasTwo) {
      twoTotal++
    }
    if (result.hasThree) {
      threeTotal++
    }
  })
  return twoTotal * threeTotal
}

// console.log(partOne(input));

export const partTwo = (input: string[]) => {
  const charSize = input[0].split('')
  const scoreArray: {
    checkedString: string;
    stringScores: {
      currString: string;
      score: number;
    }[];
  }[] = []

  // 1. Loop over each string
  input.forEach((singleString, index) => {
    const singleStringArray: any = []

    // 2. For each character in string, check with the other string if it matches
    charSize.forEach((char, index) => {
      // 3. If it matches, add a point to that string in relation to the checked string
      let score = 0
      let thisString = ''
      const stringScores: {
        currString: string;
        score: number;
      }[] = []
      input.forEach(checkingString => {
        thisString = checkingString
        if (singleString !== checkingString) {
          if (char === checkingString[index]) {
            score++
          }
        }
        stringScores.push({ currString: checkingString, score })
      })
      singleStringArray.stringScores = stringScores
      singleStringArray.checkedString = thisString
    })

    scoreArray.push(singleStringArray)
  })

  // 4. At the end, check which string has the most point and which string belongs to it.
  const result: { points: number; firstString: string; secondString: string } = {
    points: 0,
    firstString: '',
    secondString: ''
  }
  scoreArray.forEach(strings => {
    strings.stringScores.forEach(scores => {
      if (
        scores.score > result.points &&
        strings.checkedString !== scores.currString
      ) {
        // console.log(result.points);
        result.points = scores.score
        result.firstString = strings.checkedString
        result.secondString = scores.currString
      }
    })
  })

  // 5. Check which characters match up.
  let finalString = ''
  result.firstString.split('').forEach((char, index) => {
    // console.log(char, result.secondString[index]);
    if (char === result.secondString[index]) {
      finalString = finalString.concat(char)
    }
  })
  //   console.log(finalString);

  return finalString
}

partTwo(data)

module.exports = { partOne, partTwo }
