"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var Color_1 = require("./Color");
exports.defaultColorStop = {
    position: 0,
    color: new Color_1.Color()
};
var ColorStop = /** @class */ (function (_super) {
    tslib_1.__extends(ColorStop, _super);
    function ColorStop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorStop.prototype.toRaw = function () {
        return {
            position: this.position,
            color: this.color.toRaw()
        };
    };
    ColorStop.fromRaw = function (raw) {
        return new ColorStop({
            position: raw.position,
            color: Color_1.Color.fromRaw(raw.color)
        });
    };
    return ColorStop;
}(immutable_1.Record(exports.defaultColorStop)));
exports.ColorStop = ColorStop;
