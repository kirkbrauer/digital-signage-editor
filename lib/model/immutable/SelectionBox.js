import * as tslib_1 from "tslib";
import { Record } from 'immutable';
import { BoundingBox } from './BoundingBox';
import { Vector } from './Vector';
import { Size } from './Size';
var defaultSelectionBox = {
    startPos: new Vector(),
    cursorPos: new Vector()
};
var SelectionBox = /** @class */ (function (_super) {
    tslib_1.__extends(SelectionBox, _super);
    function SelectionBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionBox.prototype.getBoundingBox = function () {
        return new BoundingBox({
            position: this.getPosition(),
            size: this.getSize()
        });
    };
    SelectionBox.prototype.getPosition = function () {
        return new Vector({
            x: Math.min(this.startPos.x, this.cursorPos.x),
            y: Math.min(this.startPos.y, this.cursorPos.y)
        });
    };
    SelectionBox.prototype.getSize = function () {
        return new Size({
            width: Math.abs(this.cursorPos.x - this.startPos.x),
            height: Math.abs(this.cursorPos.y - this.startPos.y)
        });
    };
    SelectionBox.prototype.includes = function (node) {
        return this.getBoundingBox().includes(node.getBoundingBox());
    };
    return SelectionBox;
}(Record(defaultSelectionBox)));
export { SelectionBox };
