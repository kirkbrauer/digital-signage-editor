import * as tslib_1 from "tslib";
import { Record, List } from 'immutable';
import uuid from 'uuid/v4';
import { BoundingBox } from './BoundingBox';
import { Vector } from './Vector';
import { Size } from './Size';
var defaultVectorPath = {
    id: '',
    position: new Vector(),
    points: List()
};
var VectorPath = /** @class */ (function (_super) {
    tslib_1.__extends(VectorPath, _super);
    function VectorPath(props) {
        // Generate a unique UUID for a new vector path.
        return _super.call(this, Object.assign({}, props, { id: (props && props.id) || uuid() })) || this;
    }
    VectorPath.prototype.getBoundingBox = function () {
        return new BoundingBox({
            position: this.getPosition(),
            size: this.getSize()
        });
    };
    VectorPath.prototype.getTransformedBoundingBox = function () {
        return new BoundingBox({
            position: this.getPosition(),
            size: this.getSize()
        });
    };
    VectorPath.prototype.getPosition = function () {
        var e_1, _a;
        var pointZeroPos = this.points.get(0).position;
        // Get the min x value
        var minX = pointZeroPos.x;
        var minY = pointZeroPos.y;
        try {
            for (var _b = tslib_1.__values(this.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                if (point.position.x < minX) {
                    minX = point.position.x;
                }
                if (point.position.y < minY) {
                    minY = point.position.y;
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
        return new Vector({
            x: minX,
            y: minY
        });
    };
    VectorPath.prototype.getSize = function () {
        var e_2, _a;
        var minPos = this.getPosition();
        var pointZeroPos = this.points.get(0).position;
        var maxX = pointZeroPos.x;
        var maxY = pointZeroPos.y;
        try {
            // Get the max points
            for (var _b = tslib_1.__values(this.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                if (point.position.x > maxX) {
                    maxX = point.position.x;
                }
                if (point.position.y > maxY) {
                    maxY = point.position.y;
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
        // Return the max minus the min
        return new Size({
            width: maxX - minPos.x,
            height: maxY - minPos.y
        });
    };
    VectorPath.prototype.setPosition = function (position) {
        var parentPosition = this.getPosition();
        return this.set('points', this.points.map(function (point) {
            // Calculate the offset between the point position and the path position
            var offsetX = point.position.x - parentPosition.x;
            var offsetY = point.position.y - parentPosition.y;
            // Set the point x to the new position + the offset
            return point.set('position', new Vector({
                x: position.x + offsetX,
                y: position.y + offsetY
            }));
        }));
    };
    VectorPath.prototype.setSize = function (size) {
        var parentPosition = this.getPosition();
        var parentSize = this.getSize();
        return this.set('points', this.points.map(function (point) {
            // Calculate the offset between the points's position and the paths's position
            var offsetX = point.position.x - parentPosition.x;
            var offsetY = point.position.y - parentPosition.y;
            // Calculate the ratio of the offset to the actual width of the path
            var xPosRatio = offsetX / parentSize.width;
            var yPosRatio = offsetY / parentSize.height;
            // Set the position of the point
            return point.set('position', new Vector({
                x: parentPosition.x + (xPosRatio * size.width),
                y: parentPosition.y + (yPosRatio * size.height),
            }));
        }));
    };
    return VectorPath;
}(Record(defaultVectorPath)));
export { VectorPath };
