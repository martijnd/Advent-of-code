export {};

const input = require("./input");

function countOccurences(input: string) {
  let hasTwo = false;
  let hasThree = false;

  let chars = "abcdefghijklmnopqrstuvwxyz";

  chars.split("").map(char => {
    const regex = new RegExp(char, "g");
    const amount = (input.match(regex) || []).length;
    if (amount === 2) {
      hasTwo = true;
    } else if (amount === 3) {
      hasThree = true;
    }
  });

  return { hasTwo, hasThree };
}

const partOne = (input: string[]): number => {
  let twoTotal = 0;
  let threeTotal = 0;
  input.map(singleString => {
    const result = countOccurences(singleString);
    if (result.hasTwo) {
      twoTotal++;
    }
    if (result.hasThree) {
      threeTotal++;
    }
  });
  return twoTotal * threeTotal;
};

// console.log(partOne(input));

const partTwo = (input: string[]) => {
  const charSize = input[0].split("");
  let scoreArray: {
    checkedString: string;
    stringScores: {
      currString: string;
      score: number;
    }[];
  }[] = [];

  // 1. Loop over each string
  input.map((singleString, index) => {
    let singleStringArray: any = [];

    // 2. For each character in string, check with the other string if it matches
    charSize.map((char, index) => {
      // 3. If it matches, add a point to that string in relation to the checked string
      let score = 0;
      let thisString = "";
      let stringScores: {
        currString: string;
        score: number;
      }[] = [];
      input.map(checkingString => {
        thisString = checkingString;
        if (singleString !== checkingString) {
          if (char === checkingString[index]) {
            score++;
          }
        }
        stringScores.push({ currString: checkingString, score });
      });
      singleStringArray.stringScores = stringScores;
      singleStringArray.checkedString = thisString;
    });

    scoreArray.push(singleStringArray);
  });

  // 4. At the end, check which string has the most point and which string belongs to it.
  let result: { points: number; firstString: string; secondString: string } = {
    points: 0,
    firstString: "",
    secondString: ""
  };
  scoreArray.map(strings => {
    strings.stringScores.map(scores => {
      if (
        scores.score > result.points &&
        strings.checkedString !== scores.currString
      ) {
        // console.log(result.points);
        result.points = scores.score;
        result.firstString = strings.checkedString;
        result.secondString = scores.currString;
      }
    });
  });

  // 5. Check which characters match up.
  let finalString = "";
  result.firstString.split("").map((char, index) => {
    // console.log(char, result.secondString[index]);
    if (char === result.secondString[index]) {
      finalString = finalString.concat(char);
    }
  });
  //   console.log(finalString);

  return finalString;
};

partTwo(input);

module.exports = { partOne, partTwo };
