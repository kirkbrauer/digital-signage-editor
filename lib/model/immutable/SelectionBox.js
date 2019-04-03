import * as tslib_1 from "tslib";
import { Record } from 'immutable';
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
        // Calculate the max and min positions of the node
        var nodeMinX = node.getX();
        var nodeMinY = node.getY();
        var nodeMaxX = node.getX() + node.getWidth();
        var nodeMaxY = node.getY() + node.getHeight();
        var minX = this.getX();
        var minY = this.getY();
        var maxX = this.getX() + this.getWidth();
        var maxY = this.getY() + this.getHeight();
        // Check if any corners of the node are inside the selection box
        if ((nodeMinX >= minX && nodeMinX <= maxX) || (nodeMaxX >= minX && nodeMaxX <= maxX)) {
            if ((nodeMinY >= minY && nodeMinY <= maxY) || (nodeMaxY >= minY && nodeMaxY <= maxY)) {
                return true;
            }
        }
        // Check if any corners of the selection box are inside the node
        if ((minX >= nodeMinX && minX <= nodeMaxX) || (maxX >= nodeMinX && maxX <= nodeMaxX)) {
            if ((minY >= nodeMinY && minY <= nodeMaxY) || (maxY >= nodeMinY && maxY <= nodeMaxY)) {
                return true;
            }
        }
        return false;
    };
    return SelectionBox;
}(Record(defaultSelectionBox)));
export { SelectionBox };
