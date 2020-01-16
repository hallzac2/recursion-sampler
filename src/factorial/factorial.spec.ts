import { factorial } from "./factorial";

describe('factorial', () => {
  const testCases = [
    { input: null, expected: undefined },
    { input: undefined, expected: undefined },
    { input: NaN, expected: undefined },
    { input: -1, expected: undefined },
    { input: 0, expected: 1 },
    { input: 1, expected: 1 },
    { input: 2, expected: 2 },
    { input: 3, expected: 6 },
    { input: 4, expected: 24 },
    { input: 5, expected: 120 },
    { input: 6, expected: 720 },
    { input: 7, expected: 5_040 },
    { input: 8, expected: 40_320 },
    { input: 9, expected: 362_880 },
    { input: 10, expected: 362_8800 },
    { input: 11, expected: 39_916_800 },
    { input: 12, expected: 479_001_600 },
    { input: 13, expected: 6_227_020_800 },
    { input: 14, expected: 87_178_291_200 },
    { input: 15, expected: 1_307_674_368_000 },
    { input: 16, expected: 20_922_789_888_000 },
    { input: 17, expected: 355_687_428_096_000 },
    { input: 18, expected: 6_402_373_705_728_000 },
  ];

  testCases.forEach(({input, expected}) => {
    it(`calculates the factorial of ${input} as ${expected}`, () => {
      const actual = factorial(input);
      expect(actual).toBe(expected);
    });
  });
});
