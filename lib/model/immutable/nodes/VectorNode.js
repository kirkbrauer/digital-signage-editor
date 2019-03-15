import * as tslib_1 from "tslib";
import { Node } from './Node';
/**
 * A vector shape node.
 */
var VectorNode = /** @class */ (function (_super) {
    tslib_1.__extends(VectorNode, _super);
    function VectorNode(config) {
        var _this = _super.call(this, config) || this;
        _this.paths = _this.paths;
        return _this;
    }
    VectorNode.prototype.setPosition = function (position) {
        return this.cloneWith({
            paths: this.setChildPositions(this.paths, position)
        });
    };
    VectorNode.prototype.getPosition = function () {
        return this.calculatePosition(this.paths);
    };
    VectorNode.prototype.getHeight = function () {
        return this.calculateHeight(this.paths);
    };
    VectorNode.prototype.setHeight = function (height) {
        return this.cloneWith({
            paths: this.setChildHeights(this.paths, height)
        });
    };
    VectorNode.prototype.getWidth = function () {
        return this.calculateWidth(this.paths);
    };
    VectorNode.prototype.setWidth = function (width) {
        return this.cloneWith({
            paths: this.setChildWidths(this.paths, width)
        });
    };
    VectorNode.prototype.toJS = function () {
        return tslib_1.__assign({}, _super.prototype.toJS.call(this), { paths: this.paths });
    };
    VectorNode.prototype.toRaw = function () { };
    return VectorNode;
}(Node));
export { VectorNode };
