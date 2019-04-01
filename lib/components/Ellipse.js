import * as tslib_1 from "tslib";
import React from 'react';
import NodeComponent from './NodeComponent';
var Ellipse = /** @class */ (function (_super) {
    tslib_1.__extends(Ellipse, _super);
    function Ellipse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ellipse.prototype.renderStaticContent = function () {
        return (React.createElement("div", { style: this.props.node.toCSS() }));
    };
    return Ellipse;
}(NodeComponent));
export default Ellipse;
