import * as tslib_1 from "tslib";
import React, { Component } from 'react';
var SelectionBox = /** @class */ (function (_super) {
    tslib_1.__extends(SelectionBox, _super);
    function SelectionBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionBox.prototype.render = function () {
        var box = this.props.box;
        var boxPosition = box.getPosition();
        var boxSize = box.getSize();
        return (React.createElement("div", { style: {
                transform: "translate(" + boxPosition.x + "px, " + boxPosition.y + "px)",
                width: boxSize.width,
                height: boxSize.height,
                position: 'absolute',
                backgroundColor: 'rgba(66, 104, 255, 0.3)'
            } }));
    };
    return SelectionBox;
}(Component));
export default SelectionBox;
