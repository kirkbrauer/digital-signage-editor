"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var Vector_1 = require("./Vector");
var Size_1 = require("./Size");
exports.defaultBoundingBox = {
    position: new Vector_1.Vector(),
    size: new Size_1.Size()
};
var BoundingBox = /** @class */ (function (_super) {
    tslib_1.__extends(BoundingBox, _super);
    function BoundingBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns the minimum x value of the sizeable.
     */
    BoundingBox.prototype.getMinX = function () {
        return this.position.x;
    };
    /**
     * Returns the minimum y value of the sizeable.
     */
    BoundingBox.prototype.getMinY = function () {
        return this.position.y;
    };
    /**
     * Returns the maximum x value of the sizeable.
     */
    BoundingBox.prototype.getMaxX = function () {
        return this.position.x + this.size.width;
    };
    /**
     * Returns the maximum y value of the sizeable.
     */
    BoundingBox.prototype.getMaxY = function () {
        return this.position.y + this.size.height;
    };
    /**
     * Returns true if either of the bounding boxes instersect.
     * @param boundingBox The bounding box to check.
     */
    BoundingBox.prototype.includes = function (boundingBox) {
        // Calculate the max and min positions of the other bounding box
        var nodeMinX = boundingBox.getMinX();
        var nodeMinY = boundingBox.getMinY();
        var nodeMaxX = boundingBox.getMaxX();
        var nodeMaxY = boundingBox.getMaxY();
        var minX = this.getMinX();
        var minY = this.getMinY();
        var maxX = this.getMaxX();
        var maxY = this.getMaxY();
        // Check if any corners of the other box are inside the bounding box
        if ((nodeMinX >= minX && nodeMinX <= maxX) || (nodeMaxX >= minX && nodeMaxX <= maxX)) {
            if ((nodeMinY >= minY && nodeMinY <= maxY) || (nodeMaxY >= minY && nodeMaxY <= maxY)) {
                return true;
            }
        }
        // Check if any corners of the bounding box are inside the other box
        if ((minX >= nodeMinX && minX <= nodeMaxX) || (maxX >= nodeMinX && maxX <= nodeMaxX)) {
            if ((minY >= nodeMinY && minY <= nodeMaxY) || (maxY >= nodeMinY && maxY <= nodeMaxY)) {
                return true;
            }
        }
        return false;
    };
    return BoundingBox;
}(immutable_1.Record(exports.defaultBoundingBox)));
exports.BoundingBox = BoundingBox;
