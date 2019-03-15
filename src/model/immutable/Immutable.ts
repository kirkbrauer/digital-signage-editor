/**
 * Abstract class for immutable objects.
 * @template T The JS type of the class.
 * @template R The raw type of the object.
 */
export abstract class Immutable<T = any, R = any> {
  
  /**
   * Clones the object and returns a new instance with the new properties.
   * @param data The properties to update.
   */
  public cloneWith(data: T): this {
    return (this as any).constructor({
      ...this.toJS(),
      ...data
    });
  }

  /**
   * Clones the object.
   */
  public clone(): this {
    return this.cloneWith({} as T);
  }

  /**
   * Returns the object as a basic JS object.
   */
  public abstract toJS(): T;

  /**
   * Retruns the object as a raw serilized object.
   */
  public abstract toRaw(): R;

}
