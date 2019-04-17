"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
exports.defaultSize = {
    width: 0,
    height: 0
};
var Size = /** @class */ (function (_super) {
    tslib_1.__extends(Size, _super);
    function Size() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Size.prototype.toRaw = function () {
        return {
            width: this.width,
            height: this.height
        };
    };
    Size.fromRaw = function (raw) {
        return new Size(raw);
    };
    return Size;
}(immutable_1.Record(exports.defaultSize)));
exports.Size = Size;
