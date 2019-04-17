"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var NodeComponent_1 = tslib_1.__importDefault(require("./NodeComponent"));
var Rectangle = /** @class */ (function (_super) {
    tslib_1.__extends(Rectangle, _super);
    function Rectangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rectangle.prototype.renderStaticContent = function () {
        return (react_1.default.createElement("div", { style: this.props.node.toCSS(true) }));
    };
    return Rectangle;
}(NodeComponent_1.default));
exports.default = Rectangle;
