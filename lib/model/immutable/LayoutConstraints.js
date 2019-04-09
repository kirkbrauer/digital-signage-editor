import * as tslib_1 from "tslib";
import { Record } from 'immutable';
var defaultLayoutConstraints = {
    vertical: null,
    horizontal: null
};
var LayoutConstraints = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutConstraints, _super);
    function LayoutConstraints() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LayoutConstraints;
}(Record(defaultLayoutConstraints)));
export { LayoutConstraints };
