import * as tslib_1 from "tslib";
import { Sizeable } from './Sizeable';
import shortid from 'shortid';
/**
 * A point in a vector point.
 */
var VectorPoint = /** @class */ (function (_super) {
    tslib_1.__extends(VectorPoint, _super);
    function VectorPoint(config) {
        var _this = _super.call(this) || this;
        _this.id = config.id || shortid.generate();
        _this.position = config.position || { x: 0, y: 0 };
        _this.ctrlPointsLocked = config.ctrlPointsLocked || false;
        _this.ctrlPoint1Pos = config.ctrlPoint1Pos || _this.position;
        _this.ctrlPoint2Pos = config.ctrlPoint2Pos || _this.position;
        return _this;
    }
    VectorPoint.prototype.getID = function () {
        return this.id;
    };
    VectorPoint.prototype.getPosition = function () {
        return this.position;
    };
    VectorPoint.prototype.setPosition = function (position) {
        return this.cloneWith({
            position: position
        });
    };
    VectorPoint.prototype.getHeight = function () {
        return 0;
    };
    VectorPoint.prototype.setHeight = function (height) {
        return this;
    };
    VectorPoint.prototype.getWidth = function () {
        return 0;
    };
    VectorPoint.prototype.setWidth = function (width) {
        return this;
    };
    /**
     * Returns true if the vector point control points are locked.
     */
    VectorPoint.prototype.areCtrlPointsLocked = function () {
        return this.ctrlPointsLocked;
    };
    /**
     * Locks the vector control points.
     */
    VectorPoint.prototype.lockCtrlPoints = function () {
        return this.cloneWith({
            ctrlPointsLocked: true
        });
    };
    /**
     * Unlocks the vector control points.
     */
    VectorPoint.prototype.unlockCtrlPoints = function () {
        return this.cloneWith({
            ctrlPointsLocked: false
        });
    };
    /**
     * Returns the position of the first control point.
     */
    VectorPoint.prototype.getCtrlPoint1Pos = function () {
        return this.ctrlPoint1Pos;
    };
    /**
     * Sets the position of the first control point.
     * @param setCtrlPoint1Pos The new position of the control point.
     */
    VectorPoint.prototype.setCtrlPoint1Pos = function (ctrlPoint1Pos) {
        return this.cloneWith({
            ctrlPoint1Pos: ctrlPoint1Pos
        });
    };
    /**
     * Returns the position of the second control point.
     */
    VectorPoint.prototype.getCtrlPoint2Pos = function () {
        return this.ctrlPoint1Pos;
    };
    /**
     * Sets the position of the second control point.
     * @param ctrlPoint2Pos The new position of the control point.
     */
    VectorPoint.prototype.setCtrlPoint2Pos = function (ctrlPoint2Pos) {
        return this.cloneWith({
            ctrlPoint2Pos: ctrlPoint2Pos
        });
    };
    VectorPoint.prototype.toRaw = function () { };
    VectorPoint.prototype.toJS = function () {
        return {
            position: this.position,
            ctrlPointsLocked: this.ctrlPointsLocked,
            ctrlPoint1Pos: this.ctrlPoint1Pos,
            ctrlPoint2Pos: this.ctrlPoint2Pos
        };
    };
    VectorPoint.prototype.cloneWith = function (data) {
        return new this.constructor(tslib_1.__assign({}, this.toJS(), data));
    };
    return VectorPoint;
}(Sizeable));
export { VectorPoint };
