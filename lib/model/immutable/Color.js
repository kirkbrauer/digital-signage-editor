import * as tslib_1 from "tslib";
import { Immutable } from './Immutable';
/**
 * A RGBA color.
 */
var Color = /** @class */ (function (_super) {
    tslib_1.__extends(Color, _super);
    function Color(config) {
        var _this = _super.call(this) || this;
        _this.red = config.r;
        _this.green = config.g;
        _this.blue = config.b;
        _this.alpha = config.a || 1.0;
        return _this;
    }
    Color.prototype.getRed = function () {
        return this.red;
    };
    Color.prototype.setRed = function (red) {
        return new Color(tslib_1.__assign({}, this.toJS(), { r: red }));
    };
    Color.prototype.getGreen = function () {
        return this.green;
    };
    Color.prototype.setGreen = function (green) {
        return new Color(tslib_1.__assign({}, this.toJS(), { g: green }));
    };
    Color.prototype.getBlue = function () {
        return this.blue;
    };
    Color.prototype.setBlue = function (blue) {
        return new Color(tslib_1.__assign({}, this.toJS(), { b: blue }));
    };
    Color.prototype.getAlpha = function () {
        return this.alpha;
    };
    Color.prototype.setAlpha = function (alpha) {
        return new Color(tslib_1.__assign({}, this.toJS(), { a: alpha }));
    };
    Color.prototype.toString = function (opacity) {
        if (opacity === void 0) { opacity = 1.0; }
        // Calculate the alpha
        var alpha = opacity * this.alpha;
        // Return a rgba color
        return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + alpha + ")";
    };
    Color.prototype.toJS = function () {
        return {
            r: this.red,
            g: this.green,
            b: this.blue,
            a: this.alpha
        };
    };
    Color.prototype.toRaw = function () { };
    return Color;
}(Immutable));
export { Color };
