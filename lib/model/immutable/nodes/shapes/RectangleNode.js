import * as tslib_1 from "tslib";
import { ShapeNode } from './ShapeNode';
/**
 * A rectangle shape node.
 */
var RectangleNode = /** @class */ (function (_super) {
    tslib_1.__extends(RectangleNode, _super);
    function RectangleNode(config) {
        var _this = _super.call(this, config) || this;
        _this.cornerRadius = config.cornerRadius || null;
        _this.cornerRadii = config.cornerRadii || [];
        return _this;
    }
    RectangleNode.prototype.getCornerRadius = function () {
        return this.cornerRadius;
    };
    RectangleNode.prototype.setCornerRadius = function (cornerRadius) {
        return this.cloneWith({
            cornerRadius: cornerRadius
        });
    };
    RectangleNode.prototype.getCornerRadii = function () {
        return this.cornerRadii;
    };
    RectangleNode.prototype.setCornerRadii = function (cornerRadii) {
        return this.cloneWith({
            cornerRadii: cornerRadii
        });
    };
    RectangleNode.prototype.toRaw = function () { };
    RectangleNode.prototype.toJS = function () {
        return tslib_1.__assign({}, _super.prototype.toJS.call(this), { cornerRadius: this.cornerRadius, cornerRadii: this.cornerRadii });
    };
    return RectangleNode;
}(ShapeNode));
export { RectangleNode };
