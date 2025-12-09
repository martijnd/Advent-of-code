export function part1(input: string) {
  const circuits: Set<Coord>[] = [];
  const coords = input.split('\n').map((coord) => {
    const [x, y, z] = coord.split(',').map(Number);
    return { x, y, z } as Coord;
  });

  let connectedCoords: any[] = [];
  for (let i = 0; i < 10; i++) {
    let closestCoords = [] as unknown as [Coord, Coord];
    let D = Infinity;

    coords.forEach((coord1, i1) => {
      coords.forEach((coord2, i2) => {
        if (
          i1 === i2 ||
          connectedCoords.find(
            (coord) => coord.includes(coord1) && coord.includes(coord2)
          )
        ) {
          return;
        }
        const d = getDistance(coord1, coord2);
        if (d < D) {
          closestCoords = [coord1, coord2];
          D = d;
        }
      });
    });

    const index = circuits.findIndex(
      (circuit) =>
        circuit.has(closestCoords[0]) || circuit.has(closestCoords[1])
    );

    if (index === -1) {
      circuits.push(new Set(closestCoords));
    } else {
      circuits[index].add(closestCoords[0]);
      circuits[index].add(closestCoords[1]);
    }
    connectedCoords.push(closestCoords);
  }

  console.log(circuits[0].values(), circuits[1].values());
  return circuits
    .slice(0, 2)
    .reduce((total, current) => total * current.size, 1);
}

export function part2(input: string) {}

const cache = new Map<string, number>();
function getDistance(
  { x: x1, y: y1, z: z1 }: Coord,
  { x: x2, y: y2, z: z2 }: Coord
) {
  const key = `${x1},${y1},${z1}|${x2},${y2}${z2}`;
  if (cache.has(key)) {
    return cache.get(key)!;
  }
  const result = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
  cache.set(key, result);
  return result;
}

type Coord = {
  x: number;
  y: number;
  z: number;
};

function getClosestCoord(currentCoord: Coord, coordList: Coord[]): Coord {
  return coordList.reduce(
    (result, current) => {
      if (currentCoord === current) {
        return result;
      }

      const distance = getDistance(current, result[0]);
      if (distance < result[1]) {
        return [current, distance] as [Coord, number];
      }
      return result;
    },
    [coordList[0], Infinity] as [Coord, number]
  )[0];
}
