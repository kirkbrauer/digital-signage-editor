"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
exports.defaultColor = {
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
    Color.prototype.toRaw = function () {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue,
            alpha: this.alpha
        };
    };
    Color.fromRaw = function (raw) {
        return new Color(raw);
    };
    return Color;
}(immutable_1.Record(exports.defaultColor)));
exports.Color = Color;
