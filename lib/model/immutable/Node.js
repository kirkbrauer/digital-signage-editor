import * as tslib_1 from "tslib";
import { Record } from 'immutable';
import { EditorState } from 'draft-js';
import uuid from 'uuid/v4';
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
    cornerRadii: null
};
var Node = /** @class */ (function (_super) {
    tslib_1.__extends(Node, _super);
    function Node(props) {
        // Generate a unique ID for each node if none is provided
        return _super.call(this, tslib_1.__assign({}, props, { id: (props && props.id) || uuid() })) || this;
    }
    /**
     * Calculates the x position of a node containing sizeables.
     * @param sizeables The sizeables to base the position calculation.
     */
    Node.prototype.calculateX = function (sizeables) {
        var e_1, _a;
        // Get the min x values
        var minX = sizeables.get(0).getX();
        try {
            for (var sizeables_1 = tslib_1.__values(sizeables), sizeables_1_1 = sizeables_1.next(); !sizeables_1_1.done; sizeables_1_1 = sizeables_1.next()) {
                var sizeable = sizeables_1_1.value;
                if (sizeable.getX() < minX) {
                    minX = sizeable.getX();
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (sizeables_1_1 && !sizeables_1_1.done && (_a = sizeables_1.return)) _a.call(sizeables_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return minX;
    };
    /**
     * Calculates the y position of a node containing sizeables.
     * @param sizeables The sizeables to base the position calculation.
     */
    Node.prototype.calculateY = function (sizeables) {
        var e_2, _a;
        // Get the min y values
        var minY = sizeables.get(0).getY();
        try {
            for (var sizeables_2 = tslib_1.__values(sizeables), sizeables_2_1 = sizeables_2.next(); !sizeables_2_1.done; sizeables_2_1 = sizeables_2.next()) {
                var sizeable = sizeables_2_1.value;
                if (sizeable.getY() < minY) {
                    minY = sizeable.getY();
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (sizeables_2_1 && !sizeables_2_1.done && (_a = sizeables_2.return)) _a.call(sizeables_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return minY;
    };
    Node.prototype.getX = function () {
        // Return the x pos if the node has the property
        if (this.x !== null) {
            return this.x;
        }
        if (this.type === NodeType.GROUP) {
            return this.calculateX(this.nodes);
        }
        if (this.type === NodeType.VECTOR) {
            return this.calculateX(this.paths);
        }
        return 0;
    };
    Node.prototype.getY = function () {
        // Return the y pos if the node has the property
        if (this.y !== null) {
            return this.y;
        }
        if (this.type === NodeType.GROUP) {
            return this.calculateY(this.nodes);
        }
        if (this.type === NodeType.VECTOR) {
            return this.calculateY(this.paths);
        }
        return 0;
    };
    /**
     * Calculates the width of a node containing sizeables.
     * @param sizeables The sizeables to base the size calculation.
     */
    Node.prototype.calculateWidth = function (sizeables) {
        var e_3, _a;
        // Find the maximum x positions of the sizeables
        var maxX = sizeables.get(0).getX() + sizeables.get(0).getWidth();
        try {
            for (var sizeables_3 = tslib_1.__values(sizeables), sizeables_3_1 = sizeables_3.next(); !sizeables_3_1.done; sizeables_3_1 = sizeables_3.next()) {
                var sizeable = sizeables_3_1.value;
                if (sizeable.getX() + sizeable.getWidth() > maxX) {
                    maxX = sizeable.getX() + sizeable.getWidth();
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (sizeables_3_1 && !sizeables_3_1.done && (_a = sizeables_3.return)) _a.call(sizeables_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        // Return the max x minus the min x
        return maxX - this.getX();
    };
    /**
     * Calculates the height of a node containing sizeables.
     * @param sizeables The sizeables to base the size calculation.
     */
    Node.prototype.calculateHeight = function (sizeables) {
        var e_4, _a;
        // Find the maximum y positions of the sizeables
        var maxY = sizeables.get(0).getY() + sizeables.get(0).getHeight();
        try {
            for (var sizeables_4 = tslib_1.__values(sizeables), sizeables_4_1 = sizeables_4.next(); !sizeables_4_1.done; sizeables_4_1 = sizeables_4.next()) {
                var sizeable = sizeables_4_1.value;
                if (sizeable.getY() + sizeable.getHeight() > maxY) {
                    maxY = sizeable.getY() + sizeable.getHeight();
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (sizeables_4_1 && !sizeables_4_1.done && (_a = sizeables_4.return)) _a.call(sizeables_4);
            }
            finally { if (e_4) throw e_4.error; }
        }
        // Return the max x minus the min x
        return maxY - this.getY();
    };
    Node.prototype.getWidth = function () {
        // Return the width if the node has the property
        if (this.width !== null) {
            return this.width;
        }
        if (this.type === NodeType.GROUP) {
            return this.calculateWidth(this.nodes);
        }
        if (this.type === NodeType.VECTOR) {
            return this.calculateWidth(this.paths);
        }
        return 0;
    };
    Node.prototype.getHeight = function () {
        // Return the height if the node has the property
        if (this.height !== null) {
            return this.height;
        }
        if (this.type === NodeType.GROUP) {
            return this.calculateHeight(this.nodes);
        }
        if (this.type === NodeType.VECTOR) {
            return this.calculateHeight(this.paths);
        }
        return 0;
    };
    /**
     * Sets the x positions of sizeables based on the the computed x position of the node.
     * @param sizeables The sizeables to update.
     * @param x The new x position of the node.
     */
    Node.prototype.setSizeableXPositions = function (sizeables, x) {
        var _this = this;
        return sizeables.map(function (sizeable) {
            // Calculate the offset between the sizeable position and the node position
            var offset = sizeable.getX() - _this.getX();
            // Set the node x to the new position + the offset
            return sizeable.setX(x + offset);
        });
    };
    /**
     * Sets the y positions of sizeables based on the the computed y position of the node.
     * @param sizeables The sizeables to update.
     * @param y The new y position of the node.
     */
    Node.prototype.setSizeableYPositions = function (sizeables, y) {
        var _this = this;
        return sizeables.map(function (sizeable) {
            // Calculate the offset between the sizeable position and the node position
            var offset = sizeable.getY() - _this.getY();
            // Set the node y to the new position + the offset
            return sizeable.setY(y + offset);
        });
    };
    Node.prototype.setX = function (x) {
        if (this.x !== null) {
            return this.set('x', x);
        }
        if (this.type === NodeType.GROUP) {
            return this.set('nodes', this.setSizeableXPositions(this.nodes, x));
        }
        if (this.type === NodeType.VECTOR) {
            return this.set('paths', this.setSizeableXPositions(this.paths, x));
        }
        return this;
    };
    Node.prototype.setY = function (y) {
        if (this.y !== null) {
            return this.set('y', y);
        }
        if (this.type === NodeType.GROUP) {
            return this.set('nodes', this.setSizeableYPositions(this.nodes, y));
        }
        if (this.type === NodeType.VECTOR) {
            return this.set('paths', this.setSizeableYPositions(this.paths, y));
        }
        return this;
    };
    /**
     * Sets the widths of sizeables based on the the computed width of the node.
     * @param sizeables The sizeables to update.
     * @param width The new width of the node.
     */
    Node.prototype.setSizeableWidths = function (sizeables, width) {
        var _this = this;
        return sizeables.map(function (sizeable) {
            // Calculate the ratio of the width of the sizeable to the node's width
            var widthRatio = sizeable.getWidth() / _this.getWidth();
            // Calculate the offset between the sizeable's position and the node's position
            var offset = sizeable.getX() - _this.getX();
            // Calculate the ratio of the offset to the actual width of the node
            var posRatio = offset / _this.getWidth();
            // Set the x position and width of the node
            return sizeable.setX(_this.getX() + (posRatio * width)).setWidth(widthRatio * width);
        });
    };
    /**
     * Sets the heights of sizeables based on the the computed height of the node.
     * @param sizeables The sizeables to update.
     * @param height The new height of the node.
     */
    Node.prototype.setSizeableHeights = function (sizeables, width) {
        var _this = this;
        return sizeables.map(function (sizeable) {
            // Calculate the ratio of the height of the sizeable to the node's height
            var heightRatio = sizeable.getHeight() / _this.getHeight();
            // Calculate the offset between the sizeable's position and the node's position
            var offset = sizeable.getY() - _this.getY();
            // Calculate the ratio of the offset to the actual height of the node
            var posRatio = offset / _this.getHeight();
            // Set the y position and height of the node
            return sizeable.setY(_this.getY() + (posRatio * width)).setHeight(heightRatio * width);
        });
    };
    Node.prototype.setWidth = function (width) {
        if (this.width !== null) {
            return this.set('width', width);
        }
        if (this.type === NodeType.GROUP) {
            return this.set('nodes', this.setSizeableWidths(this.nodes, width));
        }
        if (this.type === NodeType.VECTOR) {
            return this.set('paths', this.setSizeableWidths(this.paths, width));
        }
        return this;
    };
    Node.prototype.setHeight = function (height) {
        if (this.height !== null) {
            return this.set('height', height);
        }
        if (this.type === NodeType.GROUP) {
            return this.set('nodes', this.setSizeableHeights(this.nodes, height));
        }
        if (this.type === NodeType.VECTOR) {
            return this.set('paths', this.setSizeableHeights(this.paths, height));
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
