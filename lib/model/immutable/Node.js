"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var Sizeable_1 = require("./Sizeable");
var LayoutConstraints_1 = require("./LayoutConstraints");
var VectorPath_1 = require("./VectorPath");
var Fill_1 = require("./Fill");
var draft_js_1 = require("draft-js");
var v4_1 = tslib_1.__importDefault(require("uuid/v4"));
var BoundingBox_1 = require("./BoundingBox");
var raw_1 = require("../raw");
var Vector_1 = require("./Vector");
var Size_1 = require("./Size");
exports.defaultNode = {
    id: '',
    type: raw_1.NodeType.RECT,
    name: null,
    position: null,
    size: null,
    visible: true,
    opacity: 1.0,
    constraints: null,
    paths: null,
    nodes: null,
    stroke: null,
    fill: null,
    strokeWeight: 0,
    strokeAlign: raw_1.StrokeAlign.CENTER,
    editorState: draft_js_1.EditorState.createEmpty(),
    cornerRadius: null,
    cornerRadii: null,
    rotation: 0
};
var Node = /** @class */ (function (_super) {
    tslib_1.__extends(Node, _super);
    function Node(props) {
        // Generate a unique ID for each node if none is provided
        return _super.call(this, tslib_1.__assign({}, props, { id: (props && props.id) || v4_1.default() })) || this;
    }
    Node.prototype.getBoundingBox = function () {
        return new BoundingBox_1.BoundingBox({
            position: this.getPosition(),
            size: this.getSize()
        });
    };
    Node.prototype.getTransformedBoundingBox = function () {
        return this.getBoundingBox();
    };
    Node.prototype.getPosition = function () {
        // Return the position if the node has the property
        if (this.position) {
            return this.position;
        }
        if (this.type === raw_1.NodeType.GROUP && this.nodes) {
            return Sizeable_1.Sizeable.calculatePosition(this.nodes);
        }
        if (this.type === raw_1.NodeType.VECTOR && this.paths) {
            return Sizeable_1.Sizeable.calculatePosition(this.paths);
        }
        return new Vector_1.Vector();
    };
    Node.prototype.getSize = function () {
        // Return the size if the node has the property
        if (this.size) {
            return this.size;
        }
        if (this.type === raw_1.NodeType.GROUP && this.nodes) {
            return Sizeable_1.Sizeable.calculateSize(this.nodes);
        }
        if (this.type === raw_1.NodeType.VECTOR && this.paths) {
            return Sizeable_1.Sizeable.calculateSize(this.paths);
        }
        return new Size_1.Size();
    };
    Node.prototype.setPosition = function (position) {
        if (this.position) {
            return this.set('position', position);
        }
        if (this.type === raw_1.NodeType.GROUP) {
            return this.set('nodes', Sizeable_1.Sizeable.setSizeablePositions(this.nodes, position));
        }
        if (this.type === raw_1.NodeType.VECTOR) {
            return this.set('paths', Sizeable_1.Sizeable.setSizeablePositions(this.paths, position));
        }
        return this;
    };
    Node.prototype.setSize = function (size) {
        if (this.size) {
            return this.set('size', size);
        }
        if (this.type === raw_1.NodeType.GROUP) {
            return this.set('nodes', Sizeable_1.Sizeable.setSizeableSizes(this.nodes, size));
        }
        if (this.type === raw_1.NodeType.VECTOR) {
            return this.set('paths', Sizeable_1.Sizeable.setSizeableSizes(this.paths, size));
        }
        return this;
    };
    /**
     * Returns the border radius CSS for a node.
     */
    Node.prototype.getBorderRadiusCSS = function () {
        if (this.type === raw_1.NodeType.RECT) {
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
        else if (this.type === raw_1.NodeType.ELLIPSE) {
            return {
                borderRadius: '50%'
            };
        }
        return {};
    };
    /**
     * Returns the node as CSS properties.
     * @param fillContainer Should the node fill its parent container div.
     */
    Node.prototype.toCSS = function (fillContainer) {
        var fillStyle = this.fill ? this.fill.toFillCSS() : {};
        var strokeStyle = this.stroke ? this.stroke.toStrokeCSS(this.strokeWeight, this.strokeAlign) : {};
        var size = this.getSize();
        return tslib_1.__assign({ height: fillContainer ? '100%' : size.height, width: fillContainer ? '100%' : size.width }, this.getBorderRadiusCSS(), fillStyle, strokeStyle);
    };
    Node.prototype.toRaw = function () {
        return {
            id: this.id,
            type: this.type,
            name: this.name,
            position: this.position ? this.position.toRaw() : null,
            size: this.size ? this.size.toRaw() : null,
            visible: this.visible,
            opacity: this.opacity,
            constraints: this.constraints ? this.constraints.toRaw() : null,
            paths: this.paths ? this.paths.map(function (path) { return path.toRaw(); }).toArray() : null,
            nodes: this.nodes ? this.nodes.map(function (node) { return node.toRaw(); }).toArray() : null,
            stroke: this.stroke ? this.stroke.toRaw() : null,
            fill: this.fill ? this.fill.toRaw() : null,
            strokeWeight: this.strokeWeight,
            strokeAlign: this.strokeAlign,
            content: this.editorState ? draft_js_1.convertToRaw(this.editorState.getCurrentContent()) : null,
            cornerRadius: this.cornerRadius,
            cornerRadii: this.cornerRadii ? this.cornerRadii.toArray() : null,
            rotation: this.rotation
        };
    };
    Node.fromRaw = function (raw) {
        return new Node({
            id: raw.id,
            type: raw.type,
            name: raw.name,
            position: raw.position ? Vector_1.Vector.fromRaw(raw.position) : null,
            size: raw.size ? Size_1.Size.fromRaw(raw.size) : null,
            visible: raw.visible,
            opacity: raw.opacity,
            constraints: raw.constraints ? LayoutConstraints_1.LayoutConstraints.fromRaw(raw.constraints) : null,
            paths: raw.paths ? immutable_1.List(raw.paths.map(function (rawPath) { return VectorPath_1.VectorPath.fromRaw(rawPath); })) : null,
            nodes: raw.nodes ? immutable_1.List(raw.nodes.map(function (rawNode) { return Node.fromRaw(rawNode); })) : null,
            stroke: raw.stroke ? Fill_1.Fill.fromRaw(raw.stroke) : null,
            fill: raw.fill ? Fill_1.Fill.fromRaw(raw.fill) : null,
            strokeWeight: raw.strokeWeight,
            strokeAlign: raw.strokeAlign,
            editorState: raw.content ? draft_js_1.EditorState.createWithContent(draft_js_1.convertFromRaw(raw.content)) : null,
            cornerRadius: raw.cornerRadius,
            cornerRadii: raw.cornerRadii ? immutable_1.List(raw.cornerRadii) : null,
            rotation: raw.rotation
        });
    };
    return Node;
}(immutable_1.Record(exports.defaultNode)));
exports.Node = Node;
