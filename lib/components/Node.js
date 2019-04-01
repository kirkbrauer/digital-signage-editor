import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { NodeType } from '../model/immutable';
import Rectangle from './Rectangle';
import Ellipse from './Ellipse';
import Text from './Text';
var Node = /** @class */ (function (_super) {
    tslib_1.__extends(Node, _super);
    function Node() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Node.prototype.render = function () {
        switch (this.props.node.type) {
            case NodeType.RECT: return React.createElement(Rectangle, tslib_1.__assign({}, this.props));
            case NodeType.ELLIPSE: return React.createElement(Ellipse, tslib_1.__assign({}, this.props));
            case NodeType.TEXT: return React.createElement(Text, tslib_1.__assign({}, this.props));
        }
        return null;
    };
    return Node;
}(Component));
export default Node;
