import * as tslib_1 from "tslib";
import { Record } from 'immutable';
import { BoundingBox } from './BoundingBox';
var defaultSelectionBox = {
    startX: 0,
    startY: 0,
    cursorX: 0,
    cursorY: 0
};
var SelectionBox = /** @class */ (function (_super) {
    tslib_1.__extends(SelectionBox, _super);
    function SelectionBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionBox.prototype.getBoundingBox = function () {
        return new BoundingBox({
            x: this.getX(),
            y: this.getY(),
            width: this.getWidth(),
            height: this.getHeight()
        });
    };
    SelectionBox.prototype.getX = function () {
        return Math.min(this.startX, this.cursorX);
    };
    SelectionBox.prototype.getY = function () {
        return Math.min(this.startY, this.cursorY);
    };
    SelectionBox.prototype.getWidth = function () {
        return Math.abs(this.cursorX - this.startX);
    };
    SelectionBox.prototype.getHeight = function () {
        return Math.abs(this.cursorY - this.startY);
    };
    SelectionBox.prototype.includes = function (node) {
        return this.getBoundingBox().includes(node.getBoundingBox());
    };
    return SelectionBox;
}(Record(defaultSelectionBox)));
export { SelectionBox };
