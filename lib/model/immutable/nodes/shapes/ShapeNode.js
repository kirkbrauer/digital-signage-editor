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
