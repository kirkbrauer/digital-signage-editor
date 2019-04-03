import * as tslib_1 from "tslib";
import React, { Component } from 'react';
var SelectionBox = /** @class */ (function (_super) {
    tslib_1.__extends(SelectionBox, _super);
    function SelectionBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionBox.prototype.render = function () {
        var box = this.props.box;
        return (React.createElement("div", { style: {
                transform: "translate(" + box.getX() + "px, " + box.getY() + "px)",
                height: box.getHeight(),
                width: box.getWidth(),
                position: 'absolute',
                backgroundColor: 'rgba(66, 104, 255, 0.3)'
            } }));
    };
    return SelectionBox;
}(Component));
export default SelectionBox;
