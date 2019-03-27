import * as tslib_1 from "tslib";
import { Node } from '../Node';
/**
 * Defines stroke alignments.
 */
export var StrokeAlign;
(function (StrokeAlign) {
    StrokeAlign["INSIDE"] = "INSIDE";
    StrokeAlign["OUTSIDE"] = "OUTSIDE";
    StrokeAlign["CENTER"] = "CENTER";
})(StrokeAlign || (StrokeAlign = {}));
/**
 * A shape node.
 */
var ShapeNode = /** @class */ (function (_super) {
    tslib_1.__extends(ShapeNode, _super);
    function ShapeNode(config) {
        var _this = _super.call(this, config) || this;
        _this.position = config.position || { x: 0, y: 0 };
        _this.height = config.height || 0;
        _this.width = config.width || 0;
        _this.stroke = config.stroke || null;
        _this.fill = config.fill || null;
        _this.strokeWeight = config.strokeWeight || null;
        _this.strokeAlign = config.strokeAlign || null;
        return _this;
    }
    /**
     * Returns the stroke.
     */
    ShapeNode.prototype.getStroke = function () {
        return this.stroke;
    };
    /**
     * Sets the stroke.
     * @param stroke The new stroke.
     */
    ShapeNode.prototype.setStroke = function (stroke) {
        return this.cloneWith({
            stroke: stroke
        });
    };
    /**
     * Returns the fill.
     */
    ShapeNode.prototype.getFill = function () {
        return this.fill;
    };
    /**
     * Sets the fill.
     * @param fill The new fill.
     */
    ShapeNode.prototype.setFill = function (fill) {
        return this.cloneWith({
            fill: fill
        });
    };
    /**
     * Returns the stroke weight.
     */
    ShapeNode.prototype.getStrokeWeight = function () {
        return this.strokeWeight;
    };
    /**
     * Sets the the stroke weight.
     * @param strokeWeight The new stroke weight.
     */
    ShapeNode.prototype.setStrokeWeight = function (strokeWeight) {
        return this.cloneWith({
            strokeWeight: strokeWeight
        });
    };
    /**
     * Returns the stroke alignment.
     */
    ShapeNode.prototype.getStrokeAlign = function () {
        return this.strokeAlign;
    };
    /**
     * Sets the stroke alignment.
     * @param strokeAlign The new stroke weight.
     */
    ShapeNode.prototype.setStrokeAlign = function (strokeAlign) {
        return this.cloneWith({
            strokeAlign: strokeAlign
        });
    };
    ShapeNode.prototype.getPosition = function () {
        return this.position;
    };
    ShapeNode.prototype.setPosition = function (position) {
        return this.cloneWith({
            position: position
        });
    };
    ShapeNode.prototype.getHeight = function () {
        return this.height;
    };
    ShapeNode.prototype.setHeight = function (height) {
        return this.cloneWith({
            height: height
        });
    };
    ShapeNode.prototype.getWidth = function () {
        return this.width;
    };
    ShapeNode.prototype.setWidth = function (width) {
        return this.cloneWith({
            width: width
        });
    };
    ShapeNode.prototype.toJS = function () {
        return tslib_1.__assign({}, _super.prototype.toJS.call(this), { position: this.position, width: this.width, height: this.height, stroke: this.stroke, fill: this.fill, strokeWeight: this.strokeWeight, strokeAlign: this.strokeAlign });
    };
    ShapeNode.prototype.toRaw = function () { };
    return ShapeNode;
}(Node));
export { ShapeNode };
