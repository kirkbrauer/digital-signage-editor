import * as tslib_1 from "tslib";
import { Sizeable } from './Sizeable';
/**
 * A vector path.
 */
var VectorPath = /** @class */ (function (_super) {
    tslib_1.__extends(VectorPath, _super);
    function VectorPath(config) {
        var _this = _super.call(this) || this;
        _this.points = config.points || [];
        _this.open = config.open || false;
        return _this;
    }
    VectorPath.prototype.getPosition = function () {
        return this.calculatePosition(this.points);
    };
    VectorPath.prototype.setPosition = function (position) {
        return this.cloneWith({
            points: this.setChildPositions(this.points, position)
        });
    };
    VectorPath.prototype.getHeight = function () {
        return this.calculateHeight(this.points);
    };
    VectorPath.prototype.setHeight = function (height) {
        return this.cloneWith({
            points: this.setChildHeights(this.points, height)
        });
    };
    VectorPath.prototype.getWidth = function () {
        return this.calculateWidth(this.points);
    };
    VectorPath.prototype.setWidth = function (width) {
        return this.cloneWith({
            points: this.setChildWidths(this.points, width)
        });
    };
    /**
     * Gets the points in the vector path.
     */
    VectorPath.prototype.getPoints = function () {
        return this.points;
    };
    /**
     * Sets the points in the vector path.
     * @param points The new points in the path.
     */
    VectorPath.prototype.setPoints = function (points) {
        return this.cloneWith({
            points: points
        });
    };
    /**
     * Adds a point to the path.
     * @param point The point to add.
     */
    VectorPath.prototype.addPoint = function (point) {
        return this.cloneWith({
            points: this.points.concat([point])
        });
    };
    /**
     * Removes a point from the path.
     * @param point The point to add.
     */
    VectorPath.prototype.removePoint = function (id) {
        var newPoints = [];
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (point.getID() !== id) {
                newPoints.push(point);
            }
        }
        return this.cloneWith({
            points: newPoints
        });
    };
    /**
     * Updates a point in the path.
     * @param newPoint The point to update.
     */
    VectorPath.prototype.updatePoint = function (newPoint) {
        var newPoints = [];
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (point.getID() === newPoint.getID()) {
                newPoints.push(newPoint);
            }
            else {
                newPoints.push(point);
            }
        }
        return this.cloneWith({
            points: newPoints
        });
    };
    /**
     * Returns true if the path is open.
     */
    VectorPath.prototype.isOpen = function () {
        return this.open;
    };
    VectorPath.prototype.toRaw = function () { };
    VectorPath.prototype.toJS = function () {
        return {
            points: this.points,
            open: this.open
        };
    };
    VectorPath.prototype.cloneWith = function (data) {
        return this.constructor(tslib_1.__assign({}, this.toJS(), data));
    };
    VectorPath.prototype.clone = function () {
        return this.cloneWith({});
    };
    return VectorPath;
}(Sizeable));
export { VectorPath };
