import { factorial } from "./factorial";

describe('factorial', () => {
  const testCases = [
    { param: -1, expected: undefined },
    { param: 0, expected: 1 },
    { param: 1, expected: 1 },
    { param: 2, expected: 2 },
    { param: 3, expected: 6 },
    { param: 4, expected: 24 },
    { param: 5, expected: 120 },
    { param: 6, expected: 720 },
    { param: 7, expected: 5_040 },
    { param: 8, expected: 40_320 },
    { param: 9, expected: 362_880 },
    { param: 10, expected: 362_8800 },
    { param: 11, expected: 39_916_800 },
    { param: 12, expected: 479_001_600 },
    { param: 13, expected: 6_227_020_800 },
    { param: 14, expected: 87_178_291_200 },
    { param: 15, expected: 1_307_674_368_000 },
    { param: 16, expected: 20_922_789_888_000 },
    { param: 17, expected: 355_687_428_096_000 },
    { param: 18, expected: 6_402_373_705_728_000 },
  ];

  testCases.forEach(({param, expected}) => {
    it(`calculates the factorial of ${param} as ${expected}`, () => {
      const actual = factorial(param);
      expect(actual).toBe(expected);
    });
  });
});
