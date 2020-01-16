/**
 * Memoizes the given function
 * 
 * @param fn The function to memoize, it should be a pure function
 * @return A new function that is a memoized version of the given function
 */
export function memoize<T>(fn: (...args: any[]) => T): (...args: any[]) => T {
  const memoStore: { [key:string]: T; } = {};

  // See https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters for info on typing Javascript's this
  // memoize can't return an arrow function because that would not work as a property on an object. This is due to how this gets set for arrow functions.
  return function(this: any) {
    const args = Array.prototype.slice.call(arguments);
    const key = args.map((arg) => {
      return (arg instanceof Object) ? JSON.stringify(arg) : arg
    }).toString();

    if (!(key in memoStore)) {
      const result = fn.apply(this, args);
      memoStore[key] = result;
    }

    return memoStore[key];
  };
}
