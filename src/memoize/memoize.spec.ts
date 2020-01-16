import { memoize } from "./memoize";

describe('memoize', () => {
  it('should work with 1 primitive param', () => {
    const mockAddFive = jest.fn(x => x + 5);
    const memoizedAddFive = memoize(mockAddFive);

    const firstResult = memoizedAddFive(0);
    const secondResult = memoizedAddFive(0);

    expect(firstResult).toBe(secondResult);
    expect(mockAddFive.mock.calls.length).toBe(1);
  });

  it('should work with multiple primitive params', () => {
    const mockMultiply = jest.fn((x, y) => x * y);
    const memoizedMultiply = memoize(mockMultiply);

    const firstResult = memoizedMultiply(5, 6);
    const secondResult = memoizedMultiply(5, 6);

    expect(firstResult).toBe(secondResult);
    expect(mockMultiply.mock.calls.length).toBe(1);
  });

  it('should work with 1 object param', () => {
    const mockGetPropertyCount = jest.fn(obj => Object.keys(obj).length);
    const memoizedGetPropertyCount = memoize(mockGetPropertyCount);

    const firstResult = memoizedGetPropertyCount({ a: 1, b: 2 });
    const secondResult = memoizedGetPropertyCount({ a: 1, b: 2 });

    expect(firstResult).toBe(secondResult);
    expect(mockGetPropertyCount.mock.calls.length).toBe(1);
  });

  it('should work with multiple object params', () => {
    const getPropertyCount = (obj: Object) => Object.keys(obj).length;
    const mockSumPropertyCount = jest.fn((obj1, obj2) => getPropertyCount(obj1) + getPropertyCount(obj2));
    const memoizedSumPropertyCount = memoize(mockSumPropertyCount);

    const firstResult = memoizedSumPropertyCount({ a: 1, b: 2 }, { c: 3, d: 4 });
    const secondResult = memoizedSumPropertyCount({ a: 1, b: 2 }, { c: 3, d: 4 });

    expect(firstResult).toBe(secondResult);
    expect(mockSumPropertyCount.mock.calls.length).toBe(1);
  });

  it('should work with a mix of primitive and object params', () => {
    const mockGetPropertyCountPlusN = jest.fn((obj, num) => Object.keys(obj).length + num);
    const memoizedGetPropertyCountPlusN = memoize(mockGetPropertyCountPlusN);

    const firstResult = memoizedGetPropertyCountPlusN({ a: 1, b: 2 }, 5);
    const secondResult = memoizedGetPropertyCountPlusN({ a: 1, b: 2 }, 5);

    expect(firstResult).toBe(secondResult);
    expect(mockGetPropertyCountPlusN.mock.calls.length).toBe(1);
  });

  it('should care about parameter order', () => {
    const mockMultiply = jest.fn((x, y) => x * y);
    const memoizedMultiply = memoize(mockMultiply);

    const firstResult = memoizedMultiply(5, 6);
    const secondResult = memoizedMultiply(6, 5);

    expect(firstResult).toBe(secondResult);
    expect(mockMultiply.mock.calls.length).toBe(2);
  });

  it('should memoize multiple values', () => {
    const mockAddFive = jest.fn(x => x + 5);
    const memoizedAddFive = memoize(mockAddFive);

    const firstResultSet = [1, 2, 3, 4, 5].map(memoizedAddFive);
    const secondResultSet = [1, 2, 3, 4, 5].map(memoizedAddFive);

    expect(firstResultSet.length).toBe(secondResultSet.length);
    secondResultSet.forEach((num) => expect(firstResultSet).toContain(num));
    expect(mockAddFive.mock.calls.length).toBe(5);
  });

  it('should work as a property on an object', () => {
    const mockAdd = jest.fn((x, y) => x + y);

    const calculator = {
      add: memoize(mockAdd)
    };

    const firstResult = calculator.add(5, 6);
    const secondResult = calculator.add(5, 6);

    expect(firstResult).toBe(secondResult);
    expect(mockAdd.mock.calls.length).toBe(1);
  });

  it('should be callable when an object is set as the this context', () => {
    const mockAdd = jest.fn((x, y) => x + y);

    const calculator = {
      add: memoize(mockAdd),
      addFive: function(x: number) {
        return this.add(x, 5);
      }
    };

    const actual = calculator.addFive(5);

    expect(actual).toBe(10);
    expect(mockAdd.mock.calls.length).toBe(1);
  });
});
