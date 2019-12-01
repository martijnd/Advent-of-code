const partOne = require("./main").partOne;
const partTwo = require("./main").partTwo;

test("correctly calculates the frequency", () => {
  expect(partOne(["+1", "+1", "+1"])).toBe(3);
  expect(partOne(["+1", "+1", "-2"])).toBe(0);
  expect(partOne(["-1", "-2", "-3"])).toBe(-6);
});

test("Part two correctly calculates the repeated frequency", () => {
  expect(partTwo(["+1", "-1"])).toBe(0);
  expect(partTwo(["+3", "+3", "+4", "-2", "-4"])).toBe(10);
  expect(partTwo(["-6", "+3", "+8", "+5", "-6"])).toBe(5);
  expect(partTwo(["+7", "+7", "-2", "-7", "-4"])).toBe(14);
});
