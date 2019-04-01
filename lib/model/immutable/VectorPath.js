import * as tslib_1 from "tslib";
import { Record, List } from 'immutable';
import uuid from 'uuid/v4';
var defaultVectorPath = {
    id: '',
    x: 0,
    y: 0,
    points: List()
};
var VectorPath = /** @class */ (function (_super) {
    tslib_1.__extends(VectorPath, _super);
    function VectorPath(props) {
        // Generate a unique UUID for a new vector path.
        return _super.call(this, Object.assign({}, props, { id: (props && props.id) || uuid() })) || this;
    }
    VectorPath.prototype.getX = function () {
        var e_1, _a;
        // Get the min x value
        var minX = this.points.get(0).x;
        try {
            for (var _b = tslib_1.__values(this.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                if (point.x < minX) {
                    minX = point.x;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return minX;
    };
    VectorPath.prototype.getY = function () {
        var e_2, _a;
        // Get the min y value
        var minY = this.points.get(0).y;
        try {
            for (var _b = tslib_1.__values(this.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                if (point.y < minY) {
                    minY = point.y;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return minY;
    };
    VectorPath.prototype.getWidth = function () {
        var e_3, _a;
        var maxX = this.points.get(0).x;
        var minX = this.points.get(0).x;
        try {
            // Get the max and min x values
            for (var _b = tslib_1.__values(this.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                if (point.x > maxX) {
                    maxX = point.x;
                }
                if (point.x < minX) {
                    minX = point.x;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        // Return the max x pos minus the min x pos
        return maxX - minX;
    };
    VectorPath.prototype.getHeight = function () {
        var e_4, _a;
        var maxY = this.points.get(0).y;
        var minY = this.points.get(0).y;
        try {
            // Get the max and min y values
            for (var _b = tslib_1.__values(this.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                if (point.y > maxY) {
                    maxY = point.x;
                }
                if (point.y < minY) {
                    minY = point.x;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        // Return the max y pos minus the min y pos
        return maxY - minY;
    };
    VectorPath.prototype.setX = function (x) {
        var _this = this;
        return this.set('points', this.points.map(function (point) {
            // Calculate the offset between the point position and the path position
            var offset = point.x - _this.getX();
            // Set the point x to the new position + the offset
            return point.set('x', x + offset);
        }));
    };
    VectorPath.prototype.setY = function (y) {
        var _this = this;
        return this.set('points', this.points.map(function (point) {
            // Calculate the offset between the point position and the path position
            var offset = point.y - _this.getX();
            // Set the point y to the new position + the offset
            return point.set('y', y + offset);
        }));
    };
    VectorPath.prototype.setWidth = function (width) {
        var _this = this;
        return this.set('points', this.points.map(function (point) {
            // Calculate the offset between the points's position and the paths's position
            var offset = point.x - _this.getX();
            // Calculate the ratio of the offset to the actual width of the path
            var posRatio = offset / _this.getWidth();
            // Set the x position of the point
            return point.set('x', _this.getX() + (posRatio * width));
        }));
    };
    VectorPath.prototype.setHeight = function (height) {
        var _this = this;
        return this.set('points', this.points.map(function (point) {
            // Calculate the offset between the points's position and the paths's position
            var offset = point.y - _this.getY();
            // Calculate the ratio of the offset to the actual width of the path
            var posRatio = offset / _this.getHeight();
            // Set the y position of the point
            return point.set('y', _this.getY() + (posRatio * height));
        }));
    };
    return VectorPath;
}(Record(defaultVectorPath)));
export { VectorPath };
