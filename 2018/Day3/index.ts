export function part1(input: string) {
  const claims = input.split('\n');
  const dataset = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => 0)
  );

  claims.forEach((claim) => {
    // @ts-ignore
    const [, claimId, y, x, l, w] = claim
      .match(/^#(\d+) @ (\w+),(\w+): (\w+)x(\w+)$/)
      ?.map(Number);
    for (let row = y; row < y + l; row++) {
      for (let col = x; col < x + w; col++) {
        dataset[row + 1][col]++;
      }
    }
  });
  let total = 0;

  dataset.forEach((rows) => {
    rows.forEach((col) => {
      if (col > 1) {
        total++;
      }
    });
  });

  return total;
}

export function part2(input: string) {
  const claims = input.split('\n');
  const dataset = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => [] as number[])
  );

  claims.forEach((claim) => {
    // @ts-ignore
    const [, claimId, y, x, l, w] = claim
      .match(/^#(\d+) @ (\w+),(\w+): (\w+)x(\w+)$/)
      ?.map(Number);
    for (let row = y; row < y + l; row++) {
      for (let col = x; col < x + w; col++) {
        dataset[row + 1][col].push(claimId);
      }
    }
  });
  let id = null;
  claims.forEach((claim) => {
    let gotcha = false;
    // @ts-ignore
    const [, claimId, y, x, l, w] = claim
      .match(/^#(\d+) @ (\w+),(\w+): (\w+)x(\w+)$/)
      ?.map(Number);
    for (let row = y; row < y + l; row++) {
      for (let col = x; col < x + w; col++) {
        if (dataset[row + 1][col].length > 1) {
          gotcha = true;
        }
      }
    }

    if (!gotcha) {
      id = claimId;
    }
  });

  return id;

  console.log(dataset);
}
