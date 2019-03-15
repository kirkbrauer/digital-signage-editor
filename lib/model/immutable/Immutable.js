import * as tslib_1 from "tslib";
/**
 * Abstract class for immutable objects.
 * @template T The JS type of the class.
 * @template R The raw type of the object.
 */
var Immutable = /** @class */ (function () {
    function Immutable() {
    }
    /**
     * Clones the object and returns a new instance with the new properties.
     * @param data The properties to update.
     */
    Immutable.prototype.cloneWith = function (data) {
        return this.constructor(tslib_1.__assign({}, this.toJS(), data));
    };
    /**
     * Clones the object.
     */
    Immutable.prototype.clone = function () {
        return this.cloneWith({});
    };
    return Immutable;
}());
export { Immutable };
