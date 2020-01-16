/**
 * Memoizes the given function
 * 
 * @param fn The function to memoize, it should be a pure function
 * @return A new function that is a memoized version of the given function
 */
export function memoize<T>(fn: (...args: any[]) => T): (...args: any[]) => T {
  const memoStore: { [key:string]: T; } = {};

  return function() {
    const args = Array.prototype.slice.call(arguments);
    const key = args.map((arg) => {
      return (arg instanceof Object) ? JSON.stringify(arg) : arg
    }).toString();

    if (!(key in memoStore)) {
      const result = fn(args);
      memoStore[key] = result;
    }

    return memoStore[key];
  };
}
