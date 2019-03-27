import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { RectangleNode, EllipseNode, TextNode } from '../model/immutable';
import Rectangle from './Rectangle';
import Ellipse from './Ellipse';
import Text from './Text';
var Node = /** @class */ (function (_super) {
    tslib_1.__extends(Node, _super);
    function Node() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Node.prototype.render = function () {
        if (this.props.node instanceof RectangleNode) {
            return React.createElement(Rectangle, tslib_1.__assign({}, this.props));
        }
        if (this.props.node instanceof EllipseNode) {
            return React.createElement(Ellipse, tslib_1.__assign({}, this.props));
        }
        if (this.props.node instanceof TextNode) {
            return React.createElement(Text, tslib_1.__assign({}, this.props));
        }
        return null;
    };
    return Node;
}(Component));
export default Node;
