import * as tslib_1 from "tslib";
import { Record } from 'immutable';
var defaultSize = {
    width: 0,
    height: 0
};
var Size = /** @class */ (function (_super) {
    tslib_1.__extends(Size, _super);
    function Size() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Size;
}(Record(defaultSize)));
export { Size };
