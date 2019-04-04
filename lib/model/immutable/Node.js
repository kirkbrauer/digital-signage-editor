import * as tslib_1 from "tslib";
import { Record } from 'immutable';
import { Sizeable } from './Sizeable';
import { EditorState } from 'draft-js';
import uuid from 'uuid/v4';
import { BoundingBox } from './BoundingBox';
/**
 * Defines node types.
 */
export var NodeType;
(function (NodeType) {
    NodeType["GROUP"] = "GROUP";
    NodeType["VECTOR"] = "VECTOR";
    NodeType["ELLIPSE"] = "ELLIPSE";
    NodeType["RECT"] = "RECT";
    NodeType["TEXT"] = "TEXT";
})(NodeType || (NodeType = {}));
/**
 * Defines stroke alignments.
 */
export var StrokeAlign;
(function (StrokeAlign) {
    StrokeAlign["INSIDE"] = "INSIDE";
    StrokeAlign["OUTSIDE"] = "OUTSIDE";
    StrokeAlign["CENTER"] = "CENTER";
})(StrokeAlign || (StrokeAlign = {}));
var defaultNode = {
    id: '',
    type: NodeType.RECT,
    name: null,
    x: null,
    y: null,
    width: null,
    height: null,
    visible: true,
    opacity: 1.0,
    constraints: null,
    paths: null,
    nodes: null,
    selection: false,
    stroke: null,
    fill: null,
    strokeWeight: 0,
    strokeAlign: StrokeAlign.CENTER,
    editorState: EditorState.createEmpty(),
    cornerRadius: null,
    cornerRadii: null,
    rotation: 0
};
var Node = /** @class */ (function (_super) {
    tslib_1.__extends(Node, _super);
    function Node(props) {
        // Generate a unique ID for each node if none is provided
        return _super.call(this, tslib_1.__assign({}, props, { id: (props && props.id) || uuid() })) || this;
    }
    Node.prototype.getBoundingBox = function () {
        return new BoundingBox({
            x: this.getX(),
            y: this.getY(),
            width: this.getWidth(),
            height: this.getHeight()
        });
    };
    Node.prototype.getSize = function () {
        return new BoundingBox({
            x: this.getX(),
            y: this.getY(),
            width: this.getWidth(),
            height: this.getHeight()
        });
    };
    Node.prototype.getX = function () {
        // Return the x pos if the node has the property
        if (this.x !== null) {
            return this.x;
        }
        if (this.type === NodeType.GROUP) {
            return Sizeable.calculateX(this.nodes);
        }
        if (this.type === NodeType.VECTOR) {
            return Sizeable.calculateX(this.paths);
        }
        return 0;
    };
    Node.prototype.getY = function () {
        // Return the y pos if the node has the property
        if (this.y !== null) {
            return this.y;
        }
        if (this.type === NodeType.GROUP) {
            return Sizeable.calculateY(this.nodes);
        }
        if (this.type === NodeType.VECTOR) {
            return Sizeable.calculateY(this.paths);
        }
        return 0;
    };
    Node.prototype.getWidth = function () {
        // Return the width if the node has the property
        if (this.width !== null) {
            return this.width;
        }
        if (this.type === NodeType.GROUP) {
            return Sizeable.calculateWidth(this.nodes, this.getX());
        }
        if (this.type === NodeType.VECTOR) {
            return Sizeable.calculateWidth(this.paths, this.getX());
        }
        return 0;
    };
    Node.prototype.getHeight = function () {
        // Return the height if the node has the property
        if (this.height !== null) {
            return this.height;
        }
        if (this.type === NodeType.GROUP) {
            return Sizeable.calculateHeight(this.nodes, this.getY());
        }
        if (this.type === NodeType.VECTOR) {
            return Sizeable.calculateHeight(this.paths, this.getY());
        }
        return 0;
    };
    Node.prototype.setX = function (x) {
        if (this.x !== null) {
            return this.set('x', x);
        }
        if (this.type === NodeType.GROUP) {
            return this.set('nodes', Sizeable.setSizeableXPositions(this.nodes, this.getX(), x));
        }
        if (this.type === NodeType.VECTOR) {
            return this.set('paths', Sizeable.setSizeableXPositions(this.paths, this.getX(), x));
        }
        return this;
    };
    Node.prototype.setY = function (y) {
        if (this.y !== null) {
            return this.set('y', y);
        }
        if (this.type === NodeType.GROUP) {
            return this.set('nodes', Sizeable.setSizeableYPositions(this.nodes, this.getY(), y));
        }
        if (this.type === NodeType.VECTOR) {
            return this.set('paths', Sizeable.setSizeableYPositions(this.paths, this.getY(), y));
        }
        return this;
    };
    Node.prototype.setWidth = function (width) {
        if (this.width !== null) {
            return this.set('width', width);
        }
        if (this.type === NodeType.GROUP) {
            return this.set('nodes', Sizeable.setSizeableWidths(this.nodes, this.getX(), this.getWidth(), width));
        }
        if (this.type === NodeType.VECTOR) {
            return this.set('paths', Sizeable.setSizeableWidths(this.paths, this.getX(), this.getWidth(), width));
        }
        return this;
    };
    Node.prototype.setHeight = function (height) {
        if (this.height !== null) {
            return this.set('height', height);
        }
        if (this.type === NodeType.GROUP) {
            return this.set('nodes', Sizeable.setSizeableHeights(this.nodes, this.getY(), this.getHeight(), height));
        }
        if (this.type === NodeType.VECTOR) {
            return this.set('paths', Sizeable.setSizeableHeights(this.paths, this.getY(), this.getHeight(), height));
        }
        return this;
    };
    /**
     * Returns the border radius CSS for a node.
     */
    Node.prototype.getBorderRadiusCSS = function () {
        if (this.type === NodeType.RECT) {
            if (this.cornerRadii) {
                return {
                    borderRadius: (this.cornerRadii.get(0) || 0) + "px " + (this.cornerRadii.get(1) || 0) + "px " + (this.cornerRadii.get(2) || 0) + "px " + (this.cornerRadii.get(3) || 0) + "px"
                };
            }
            if (this.cornerRadius) {
                return {
                    borderRadius: this.cornerRadius + "px"
                };
            }
        }
        else if (this.type === NodeType.ELLIPSE) {
            return {
                borderRadius: '50%'
            };
        }
        return {};
    };
    /**
     * Returns the node as CSS properties.
     */
    Node.prototype.toCSS = function () {
        var fillStyle = this.fill ? this.fill.toFillCSS() : {};
        var strokeStyle = this.stroke ? this.stroke.toStrokeCSS(this.strokeWeight, this.strokeAlign) : {};
        return tslib_1.__assign({ height: this.getHeight(), width: this.getWidth() }, this.getBorderRadiusCSS(), fillStyle, strokeStyle);
    };
    return Node;
}(Record(defaultNode)));
export { Node };
