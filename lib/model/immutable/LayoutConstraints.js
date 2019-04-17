"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
exports.defaultLayoutConstraints = {
    vertical: null,
    horizontal: null
};
var LayoutConstraints = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutConstraints, _super);
    function LayoutConstraints() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutConstraints.prototype.toRaw = function () {
        return {
            vertical: this.vertical,
            horizontal: this.horizontal
        };
    };
    LayoutConstraints.fromRaw = function (raw) {
        return new LayoutConstraints(raw);
    };
    return LayoutConstraints;
}(immutable_1.Record(exports.defaultLayoutConstraints)));
exports.LayoutConstraints = LayoutConstraints;
