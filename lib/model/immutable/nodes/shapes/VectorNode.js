import * as tslib_1 from "tslib";
import { ShapeNode } from './ShapeNode';
/**
 * A vector shape node.
 */
var VectorNode = /** @class */ (function (_super) {
    tslib_1.__extends(VectorNode, _super);
    function VectorNode(config) {
        var _this = _super.call(this, config) || this;
        _this.geometry = _this.geometry;
        return _this;
    }
    VectorNode.prototype.setPosition = function (position) {
        return new VectorNode(tslib_1.__assign({}, this.toJS(), { position: position }));
    };
    VectorNode.prototype.setHeight = function (height) {
        return new VectorNode(tslib_1.__assign({}, this.toJS(), { height: height }));
    };
    VectorNode.prototype.setWidth = function (width) {
        return new VectorNode(tslib_1.__assign({}, this.toJS(), { width: width }));
    };
    VectorNode.prototype.toJS = function () {
        return tslib_1.__assign({}, _super.prototype.toJS.call(this), { geometry: this.geometry });
    };
    return VectorNode;
}(ShapeNode));
export { VectorNode };
