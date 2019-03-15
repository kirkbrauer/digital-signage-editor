import * as tslib_1 from "tslib";
import { Sizeable } from '../Sizeable';
import shortid from 'shortid';
/**
 * An editor node.
 */
var Node = /** @class */ (function (_super) {
    tslib_1.__extends(Node, _super);
    function Node(config) {
        var _this = _super.call(this) || this;
        _this.id = config.id || shortid.generate();
        _this.name = config.name || null;
        _this.visible = config.visible || true;
        _this.preserveRatio = config.preserveRatio || false;
        _this.opacity = config.opacity || 1.0;
        _this.zIndex = config.zIndex || 0;
        _this.constraints = config.constraints || null;
        return _this;
    }
    Node.prototype.getID = function () {
        return this.id;
    };
    Node.prototype.getName = function () {
        return this.name;
    };
    Node.prototype.setName = function (name) {
        return this.cloneWith({
            name: name
        });
    };
    Node.prototype.isVisible = function () {
        return this.visible;
    };
    Node.prototype.hide = function () {
        return this.cloneWith({
            visible: false
        });
    };
    Node.prototype.show = function () {
        return this.cloneWith({
            visible: true
        });
    };
    Node.prototype.shouldPreserveRatio = function () {
        return this.preserveRatio;
    };
    Node.prototype.setPreserveRatio = function (preserveRatio) {
        return this.cloneWith({
            preserveRatio: preserveRatio
        });
    };
    Node.prototype.getOpacity = function () {
        return this.opacity;
    };
    Node.prototype.setOpacity = function (opacity) {
        return this.cloneWith({
            opacity: opacity
        });
    };
    Node.prototype.getZIndex = function () {
        return this.zIndex;
    };
    Node.prototype.setZIndex = function (zIndex) {
        return this.cloneWith({
            zIndex: zIndex
        });
    };
    Node.prototype.getConstraints = function () {
        return this.constraints;
    };
    Node.prototype.setConstraints = function (constraints) {
        return this.cloneWith({
            constraints: constraints
        });
    };
    Node.prototype.toJS = function () {
        return {
            id: this.id,
            name: this.name,
            visible: this.visible,
            preserveRatio: this.preserveRatio,
            opacity: this.opacity,
            zIndex: this.zIndex,
            constraints: this.constraints
        };
    };
    Node.prototype.toRaw = function () { };
    return Node;
}(Sizeable));
export { Node };
