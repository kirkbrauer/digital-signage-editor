"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var NodeComponent_1 = tslib_1.__importDefault(require("./NodeComponent"));
var Node_1 = tslib_1.__importDefault(require("./Node"));
var Group = /** @class */ (function (_super) {
    tslib_1.__extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Group.prototype.renderStaticContent = function () {
        var _this = this;
        return (react_1.default.createElement("div", { style: { width: '100%', height: '100%', position: 'relative' } }, this.props.node.nodes.map(function (node) { return (react_1.default.createElement(Node_1.default, { key: node.id, node: node, inGroup: true, groupPos: _this.props.node.getPosition() })); })));
    };
    return Group;
}(NodeComponent_1.default));
exports.default = Group;
