/**
 * Top level object, used to:
 * 1. Describe and keep track of the entire story graph.
 * 2. Keep track of variables (or facts).
 * 3. Performs the next story beat collapse.
 */
export class Universe {
  public static inkVersionCurrent = 21;

  private _facts: Record<string, string | number | boolean> = {};

  get facts() {
    return this._facts;
  }
}
