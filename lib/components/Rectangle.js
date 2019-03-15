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
    Rectangle.prototype.renderContent = function () {
        return (React.createElement("div", { style: tslib_1.__assign({ height: '100%', width: '100%' }, this.getFillStyle(this.props.node.fill), this.getStrokeStyle(this.props.node.stroke, this.props.node.strokeWeight, this.props.node.strokeAlign), this.getCornerStyle(this.props.node.getCornerRadius(), this.props.node.getCornerRadii())) }));
    };
    return Rectangle;
}(NodeComponent));
export default Rectangle;
