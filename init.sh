#!/bin/sh

cd 2020
mkdir "Day$1"
cd "Day$1"
touch index.ts
touch index.test.ts
touch input.ts

echo 'files created: '
echo "- Day$1/input.ts"
echo "- Day$1/index.ts"
echo "- Day$1/index.test.ts"