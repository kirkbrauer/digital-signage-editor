"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var SelectionBox = /** @class */ (function (_super) {
    tslib_1.__extends(SelectionBox, _super);
    function SelectionBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionBox.prototype.render = function () {
        var box = this.props.box;
        var boxPosition = box.getPosition();
        var boxSize = box.getSize();
        var style;
        if (this.props.insertBox) {
            style = {
                borderColor: 'black',
                borderStyle: 'inset',
                borderWidth: 1
            };
        }
        else {
            style = {
                backgroundColor: 'rgba(66, 104, 255, 0.3)'
            };
        }
        return (react_1.default.createElement("div", { style: tslib_1.__assign({ transform: "translate(" + boxPosition.x + "px, " + boxPosition.y + "px)", width: boxSize.width, height: boxSize.height, position: 'absolute' }, style) }));
    };
    return SelectionBox;
}(react_1.Component));
exports.default = SelectionBox;
