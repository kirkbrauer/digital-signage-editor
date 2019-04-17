"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var BoundingBox_1 = require("./BoundingBox");
var Vector_1 = require("./Vector");
var Size_1 = require("./Size");
exports.defaultSelectionBox = {
    startPos: new Vector_1.Vector(),
    cursorPos: new Vector_1.Vector()
};
var SelectionBox = /** @class */ (function (_super) {
    tslib_1.__extends(SelectionBox, _super);
    function SelectionBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns the bounding box of the selection box.
     */
    SelectionBox.prototype.getBoundingBox = function () {
        return new BoundingBox_1.BoundingBox({
            position: this.getPosition(),
            size: this.getSize()
        });
    };
    /**
     * Returns the position of the selection box.
     */
    SelectionBox.prototype.getPosition = function () {
        return new Vector_1.Vector({
            x: Math.min(this.startPos.x, this.cursorPos.x),
            y: Math.min(this.startPos.y, this.cursorPos.y)
        });
    };
    /**
     * Returns the size of the bounding box.
     */
    SelectionBox.prototype.getSize = function () {
        return new Size_1.Size({
            width: Math.abs(this.cursorPos.x - this.startPos.x),
            height: Math.abs(this.cursorPos.y - this.startPos.y)
        });
    };
    /**
     * Returns true if the bounding box includes a node.
     * @param node The node to test against.
     */
    SelectionBox.prototype.includes = function (node) {
        return this.getBoundingBox().includes(node.getBoundingBox());
    };
    return SelectionBox;
}(immutable_1.Record(exports.defaultSelectionBox)));
exports.SelectionBox = SelectionBox;
