import * as tslib_1 from "tslib";
import { Record } from 'immutable';
var defaultBoundingBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
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
        return this.x;
    };
    /**
     * Returns the minimum y value of the sizeable.
     */
    BoundingBox.prototype.getMinY = function () {
        return this.y;
    };
    /**
     * Returns the maximum x value of the sizeable.
     */
    BoundingBox.prototype.getMaxX = function () {
        return this.x + this.width;
    };
    /**
     * Returns the maximum y value of the sizeable.
     */
    BoundingBox.prototype.getMaxY = function () {
        return this.y + this.height;
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
        var maxY = this.getMaxX();
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
}(Record(defaultBoundingBox)));
export { BoundingBox };
