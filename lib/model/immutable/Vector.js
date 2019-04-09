import * as tslib_1 from "tslib";
import { Record } from 'immutable';
var defaultVector = {
    x: 0,
    y: 0
};
var Vector = /** @class */ (function (_super) {
    tslib_1.__extends(Vector, _super);
    function Vector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Vector;
}(Record(defaultVector)));
export { Vector };
