import * as tslib_1 from "tslib";
import { Node } from './Node';
/**
 * A node representing a group of other nodes.
 */
var GroupNode = /** @class */ (function (_super) {
    tslib_1.__extends(GroupNode, _super);
    function GroupNode(config) {
        var _this = _super.call(this, config) || this;
        _this.nodes = config.nodes || [];
        return _this;
    }
    GroupNode.prototype.getNodes = function () {
        return this.nodes;
    };
    GroupNode.prototype.getPosition = function () {
        return this.calculatePosition(this.nodes);
    };
    GroupNode.prototype.setPosition = function (position) {
        return this.cloneWith({
            nodes: this.setChildPositions(this.nodes, position)
        });
    };
    GroupNode.prototype.getHeight = function () {
        return this.calculateHeight(this.nodes);
    };
    GroupNode.prototype.setHeight = function (height) {
        return this.cloneWith({
            nodes: this.setChildHeights(this.nodes, height)
        });
    };
    GroupNode.prototype.getWidth = function () {
        return this.calculateWidth(this.nodes);
    };
    GroupNode.prototype.setWidth = function (width) {
        return this.cloneWith({
            nodes: this.setChildWidths(this.nodes, width)
        });
    };
    GroupNode.prototype.toJS = function () {
        return tslib_1.__assign({}, _super.prototype.toJS.call(this), { nodes: this.nodes });
    };
    GroupNode.prototype.toRaw = function () { };
    return GroupNode;
}(Node));
export { GroupNode };
