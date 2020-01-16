import { trampoline } from "../trampoline";

/**
 * Reverses the given string
 * 
 * @param str The string to reverse
 * @param carry The variable used to carry the current value of the reversed string over recursive calls
 * @returns The reversed string if str is not null or undefined, undefined otherwise
 */
function reverseStringImpl(str: string, carry = ''): Function|string|undefined {
  if (str == null) {
    return undefined;
  }

  if (str.length <= 0) {
    return carry;
  }

  return () => {
    const lastCharIndex = str.length - 1;
    const lastChar = str.charAt(lastCharIndex);
    const nextStr = str.substring(0, lastCharIndex);

    return reverseStringImpl(nextStr, carry + lastChar);
  };
}

/**
 * Reverses the given string
 * 
 * @param str The string to reverse
 * @returns The reversed string if str is not null or undefined, undefined otherwise
 */
const reverseString = trampoline(reverseStringImpl);
export { reverseString };
