"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var raw_1 = require("../model/raw");
var Rectangle_1 = tslib_1.__importDefault(require("./Rectangle"));
var Ellipse_1 = tslib_1.__importDefault(require("./Ellipse"));
var Text_1 = tslib_1.__importDefault(require("./Text"));
var Node = /** @class */ (function (_super) {
    tslib_1.__extends(Node, _super);
    function Node() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Node.prototype.render = function () {
        switch (this.props.node.type) {
            case raw_1.NodeType.RECT: return react_1.default.createElement(Rectangle_1.default, tslib_1.__assign({}, this.props));
            case raw_1.NodeType.ELLIPSE: return react_1.default.createElement(Ellipse_1.default, tslib_1.__assign({}, this.props));
            case raw_1.NodeType.TEXT: return react_1.default.createElement(Text_1.default, tslib_1.__assign({}, this.props));
        }
        return null;
    };
    return Node;
}(react_1.Component));
exports.default = Node;
