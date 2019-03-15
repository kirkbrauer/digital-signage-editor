import * as tslib_1 from "tslib";
import { Immutable } from './Immutable';
/**
 * An editor document.
 */
var Document = /** @class */ (function (_super) {
    tslib_1.__extends(Document, _super);
    function Document(config) {
        var _this = _super.call(this) || this;
        _this.nodes = config.nodes || [];
        _this.width = config.width || 1920;
        _this.height = config.height || 1080;
        return _this;
    }
    Document.createEmpty = function () {
        return new Document({});
    };
    Document.prototype.getNodes = function (ids) {
        if (ids) {
            var nodes = [];
            for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
                var node = _a[_i];
                if (ids.includes(node.getID())) {
                    nodes.push(node);
                }
            }
            return nodes;
        }
        return this.nodes;
    };
    Document.prototype.getNodeIds = function () {
        var ids = [];
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            ids.push(node.getID());
        }
        return ids;
    };
    Document.prototype.getHeight = function () {
        return this.height;
    };
    Document.prototype.getWidth = function () {
        return this.width;
    };
    Document.prototype.getNode = function (id) {
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.getID() === id)
                return node;
        }
        return null;
    };
    Document.prototype.updateNode = function (newNode) {
        var newNodes = [];
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.getID() === newNode.getID()) {
                newNodes.push(newNode);
            }
            else {
                newNodes.push(node);
            }
        }
        return new Document({
            nodes: newNodes,
            height: this.height,
            width: this.width
        });
    };
    Document.prototype.removeNode = function (id) {
        var newNodes = [];
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.getID() !== id) {
                newNodes.push(node);
            }
        }
        return new Document({
            nodes: newNodes,
            height: this.height,
            width: this.width
        });
    };
    Document.prototype.addNode = function (node) {
        return new Document({
            nodes: this.nodes.concat([node]),
            height: this.height,
            width: this.width
        });
    };
    Document.prototype.toJS = function () {
        return {
            nodes: this.nodes,
            height: this.height,
            width: this.width
        };
    };
    Document.prototype.toRaw = function () { };
    return Document;
}(Immutable));
export { Document };
