"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var NodeComponent_1 = tslib_1.__importDefault(require("./NodeComponent"));
var Ellipse = /** @class */ (function (_super) {
    tslib_1.__extends(Ellipse, _super);
    function Ellipse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ellipse.prototype.renderStaticContent = function () {
        return (react_1.default.createElement("div", { style: this.props.node.toCSS(true) }));
    };
    return Ellipse;
}(NodeComponent_1.default));
exports.default = Ellipse;
