"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
exports.defaultVector = {
    x: 0,
    y: 0
};
var Vector = /** @class */ (function (_super) {
    tslib_1.__extends(Vector, _super);
    function Vector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Vector.prototype.toRaw = function () {
        return {
            x: this.x,
            y: this.y
        };
    };
    Vector.fromRaw = function (raw) {
        return new Vector(raw);
    };
    return Vector;
}(immutable_1.Record(exports.defaultVector)));
exports.Vector = Vector;
