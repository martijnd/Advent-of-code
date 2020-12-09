#!/bin/sh

if [ -z "$1" ]
then
  echo "Enter a day!"
  exit 1
fi

if [ -d "./2020/Day$1" ] 
then
    echo "Directory 'Day$1' already exists!" 
else
  cd 2020
  mkdir "Day$1"
  cd "Day$1"
  touch index.ts
  touch index.test.ts
  touch input.txt

  echo "export function part1 (input: string) {

}

export function part2 (input: string) {

}" > index.ts

  echo "import { getInput } from '../../utils/getInput'
import { part1, part2 } from './index'

const data = getInput(__dirname)

const exampleData = \`\`

test('2020 - Day $1: part 1', () => {
  expect(part1(exampleData)).toBe(undefined)
  // expect(part1(data)).toBe()
})

// test('2020 - Day $1: part 2', () => {
//   expect(part2(exampleData)).toBe(undefined)
//   // expect(part2(data)).toBe()
// })" > index.test.ts

  echo "files created: "
  echo "- Day$1/input.txt"
  echo "- Day$1/index.ts"
  echo "- Day$1/index.test.ts"
fi