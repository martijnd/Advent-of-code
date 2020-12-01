const getFuelAmount = (mass: number) => Math.floor(mass) / 3 - 2;
/**
 *   Part 1
 */
// const total = input.reduce((acc, curr) => acc + getFuelAmount(curr), 0);

// console.log(total);

/**
 * Part 2
 */

export const getAnswer = (mass: number) => {
  let subtotal = 0;
  while (getFuelAmount(mass) > 0) {
    mass = getFuelAmount(mass);
    subtotal += mass;
  }

  return subtotal;
};
