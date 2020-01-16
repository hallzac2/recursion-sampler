import { reverseString } from "./reverse-string";

describe('reverse string', () => {
  const testCases = [
    { input: null, expected: undefined },
    { input: undefined, expected: undefined },
    { input: '', expected: '' },
    { input: '1234567890', expected: '0987654321' },
    { input: 'Zackary Hall', expected: 'llaH yrakcaZ' },
    { input: 'T3st S#@!(=)', expected: ')=(!@#S ts3T' },
    { input: 'RACECAR3', expected: '3RACECAR' },
  ];

  testCases.forEach(({input, expected}) => {
    it(`should reverse the given string "${input}" to be "${expected}"`, () => {
      const actual = reverseString(input);
      expect(actual).toBe(expected);
    });
  });
});
