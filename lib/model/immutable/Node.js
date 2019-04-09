import * as tslib_1 from "tslib";
import { Record } from 'immutable';
import { Sizeable } from './Sizeable';
import { EditorState } from 'draft-js';
import uuid from 'uuid/v4';
import { BoundingBox } from './BoundingBox';
import { NodeType, StrokeAlign } from '../raw';
import { Vector } from './Vector';
import { Size } from './Size';
var defaultNode = {
    id: '',
    type: NodeType.RECT,
    name: null,
    position: null,
    size: null,
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
            position: this.getPosition(),
            size: this.getSize()
        });
    };
    Node.prototype.getTransformedBoundingBox = function () {
        return this.getBoundingBox();
    };
    Node.prototype.getPosition = function () {
        // Return the position if the node has the property
        if (this.position !== null) {
            return this.position;
        }
        if (this.type === NodeType.GROUP) {
            return Sizeable.calculatePosition(this.nodes);
        }
        if (this.type === NodeType.VECTOR) {
            return Sizeable.calculatePosition(this.paths);
        }
        return new Vector();
    };
    Node.prototype.getSize = function () {
        // Return the size if the node has the property
        if (this.size !== null) {
            return this.size;
        }
        if (this.type === NodeType.GROUP) {
            return Sizeable.calculateSize(this.nodes);
        }
        if (this.type === NodeType.VECTOR) {
            return Sizeable.calculateSize(this.paths);
        }
        return new Size();
    };
    Node.prototype.setPosition = function (position) {
        if (this.position !== null) {
            return this.set('position', position);
        }
        if (this.type === NodeType.GROUP) {
            return this.set('nodes', Sizeable.setSizeablePositions(this.nodes, position));
        }
        if (this.type === NodeType.VECTOR) {
            return this.set('paths', Sizeable.setSizeablePositions(this.paths, position));
        }
        return this;
    };
    Node.prototype.setSize = function (size) {
        if (this.size !== null) {
            return this.set('size', size);
        }
        if (this.type === NodeType.GROUP) {
            return this.set('nodes', Sizeable.setSizeableSizes(this.nodes, size));
        }
        if (this.type === NodeType.VECTOR) {
            return this.set('paths', Sizeable.setSizeableSizes(this.paths, size));
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
     * @param fillContainer Should the node fill its parent container div.
     */
    Node.prototype.toCSS = function (fillContainer) {
        var fillStyle = this.fill ? this.fill.toFillCSS() : {};
        var strokeStyle = this.stroke ? this.stroke.toStrokeCSS(this.strokeWeight, this.strokeAlign) : {};
        var size = this.getSize();
        return tslib_1.__assign({ height: fillContainer ? '100%' : size.height, width: fillContainer ? '100%' : size.width }, this.getBorderRadiusCSS(), fillStyle, strokeStyle);
    };
    return Node;
}(Record(defaultNode)));
export { Node };
