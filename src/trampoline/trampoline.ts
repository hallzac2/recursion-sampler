/**
 * Applies the Trampoline pattern to ensure recursive functions will not cause a StackOverflow Exception
 * 
 * @param recursiveFunction The recursive function
 * @returns Function that will calculate the value using the given recursive function
 */
export function trampoline<T>(recursiveFunction: (...args: any[]) => T|Function): (...args: any[]) => T {

  // trampoline can't return an arrow function because that would not work as a property on an object. This is due to how this gets set for arrow functions.
  return function(...args: any[]) {
    let result = recursiveFunction(...args);
    while (result instanceof Function) {
      result = result();
    }
    return result;
  };
}