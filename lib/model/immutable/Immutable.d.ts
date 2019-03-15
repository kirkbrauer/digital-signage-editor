/**
 * Abstract class for immutable objects.
 * @template T The JS type of the class.
 * @template R The raw type of the object.
 */
export declare abstract class Immutable<T = any, R = any> {
    /**
     * Clones the object and returns a new instance with the new properties.
     * @param data The properties to update.
     */
    cloneWith(data: T): this;
    /**
     * Clones the object.
     */
    clone(): this;
    /**
     * Returns the object as a basic JS object.
     */
    abstract toJS(): T;
    /**
     * Retruns the object as a raw serilized object.
     */
    abstract toRaw(): R;
}
