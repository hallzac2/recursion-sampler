import { trampoline } from "../trampoline";

/**
 * Calculates the factorial of the given number
 * 
 * @param num The number to calculate factorial for
 * @param carry The variable used to carry the current value of factorial over recursive calls
 * @returns A number if there is no more to calculate, A function if there is more to calculate, or undefined if num is less than 0 
 */
function factorialImpl(num: number, carry = 1): Function|number|undefined {
  if (isNaN(num) || num == null || num < 0) {
    return undefined;
  }
  return (num <= 1) ? carry : () => factorialImpl(num - 1, carry * num);
}

/**
 * Calculates the factorial of the given number
 * 
 * @param num The number to calculate factorial for
 * @returns A number representing the factorial of the given number, or undefined if num is less than 0 
 */
const factorial = trampoline(factorialImpl);
export { factorial };
