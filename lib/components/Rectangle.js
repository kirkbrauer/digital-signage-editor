import * as tslib_1 from "tslib";
import React from 'react';
import NodeComponent from './NodeComponent';
var Rectangle = /** @class */ (function (_super) {
    tslib_1.__extends(Rectangle, _super);
    function Rectangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rectangle.prototype.getCornerStyle = function (cornerRadius, cornerRadii) {
        if (cornerRadii.length > 0) {
            return {
                borderRadius: (cornerRadii[0] || 0) + "px " + (cornerRadii[1] || 0) + "px " + (cornerRadii[2] || 0) + "px " + (cornerRadii[3] || 0) + "px"
            };
        }
        if (cornerRadius) {
            return {
                borderRadius: cornerRadius + "px"
            };
        }
        return {};
    };
    Rectangle.prototype.renderStaticContent = function () {
        return (React.createElement("div", { style: tslib_1.__assign({ height: '100%', width: '100%' }, this.getFillStyle(this.props.node.getFill()), this.getStrokeStyle(this.props.node.getStroke(), this.props.node.getStrokeWeight(), this.props.node.getStrokeAlign()), this.getCornerStyle(this.props.node.getCornerRadius(), this.props.node.getCornerRadii())) }));
    };
    return Rectangle;
}(NodeComponent));
export default Rectangle;
