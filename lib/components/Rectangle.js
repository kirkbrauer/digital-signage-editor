import * as tslib_1 from "tslib";
import React from 'react';
import NodeComponent from './NodeComponent';
var Rectangle = /** @class */ (function (_super) {
    tslib_1.__extends(Rectangle, _super);
    function Rectangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rectangle.prototype.renderStaticContent = function () {
        return (React.createElement("div", { style: this.props.node.toCSS() }));
    };
    return Rectangle;
}(NodeComponent));
export default Rectangle;
