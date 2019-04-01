import * as tslib_1 from "tslib";
import { Record } from 'immutable';
var defaultColor = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 1.0
};
var Color = /** @class */ (function (_super) {
    tslib_1.__extends(Color, _super);
    function Color() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Converts the color to a rgba string.
     * @param opacity The opacity of the color's parent.
     */
    Color.prototype.toString = function (opacity) {
        var alpha = this.alpha;
        if (opacity) {
            alpha = this.alpha * opacity;
        }
        return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + alpha + ")";
    };
    return Color;
}(Record(defaultColor)));
export { Color };
