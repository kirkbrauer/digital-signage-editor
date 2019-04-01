import * as tslib_1 from "tslib";
import { Record } from 'immutable';
/**
 * Defines constraint types.
 */
export var Constraint;
(function (Constraint) {
    Constraint["TOP"] = "TOP";
    Constraint["BOTTOM"] = "BOTTOM";
    Constraint["CENTER"] = "CENTER";
    Constraint["TOP_BOTTOM"] = "TOP_BOTTOM";
    Constraint["LEFT"] = "LEFT";
    Constraint["RIGHT"] = "RIGHT";
    Constraint["LEFT_RIGHT"] = "LEFT_RIGHT";
    Constraint["SCALE"] = "SCALE";
})(Constraint || (Constraint = {}));
var LayoutConstraints = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutConstraints, _super);
    function LayoutConstraints() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LayoutConstraints;
}(Record({})));
export { LayoutConstraints };
