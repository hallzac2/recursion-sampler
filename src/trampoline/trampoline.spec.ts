import { trampoline } from "./trampoline";

/**
 * Counts to the given number recursively
 * 
 * @param num The number to count to
 * @param carry The variable used to carry the current count over recursive calls
 * @returns The number that was counted to
 */
function incrementToNImpl(num: number, carry = 0): number|Function {
  return (carry >= num) ? carry : () => incrementToNImpl(num, carry + 1);
}

describe('trampoline', () => {
  it('should return the computed value from the function', () => {
    const incrementToN = trampoline(incrementToNImpl);

    const expected = 10;
    const actual = incrementToN(10);

    expect(actual).toBe(expected);
  });

  it('should not cause a StackOverflow error', () => {
    const incrementToN = trampoline(incrementToNImpl);

    const expected = 50_000;
    const actual = incrementToN(expected);
    
    expect(actual).toBe(expected);
  });

  it('should work as a property on an object', () => {
    const incrementer = {
      incrementToN: trampoline(incrementToNImpl)
    };

    const expected = 10;
    const actual = incrementer.incrementToN(10);

    expect(actual).toBe(expected);
  });

  it('should be callable when an object is set as the this context', () => {
    const incrementer = {
      incrementToN: trampoline(incrementToNImpl),
      incrementToTen: function() {
        return this.incrementToN(10);
      }
    };

    const expected = 10;
    const actual = incrementer.incrementToN(10);

    expect(actual).toBe(expected);
  });
});