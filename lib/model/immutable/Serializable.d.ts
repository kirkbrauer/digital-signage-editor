/**
 * Represents an object that can be serialized into raw data.
 * @template R The type of the raw data.
 */
export declare abstract class Serializable<R> {
    /**
     * Converts the serializable to the raw format.
     */
    abstract toRaw(): R;
}
