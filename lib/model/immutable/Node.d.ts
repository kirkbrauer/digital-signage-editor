import { Record, List } from 'immutable';
import { Sizeable } from './Sizeable';
import { LayoutConstraints } from './LayoutConstraints';
import { VectorPath } from './VectorPath';
import { Fill } from './Fill';
import { EditorState } from 'draft-js';
import { CSSProperties } from 'react';
/**
 * Defines node types.
 */
export declare enum NodeType {
    GROUP = "GROUP",
    VECTOR = "VECTOR",
    ELLIPSE = "ELLIPSE",
    RECT = "RECT",
    TEXT = "TEXT"
}
/**
 * Defines stroke alignments.
 */
export declare enum StrokeAlign {
    INSIDE = "INSIDE",
    OUTSIDE = "OUTSIDE",
    CENTER = "CENTER"
}
/**
 * An editor node.
 */
export interface INode {
    /**
     * ID of the node.
     */
    id: string;
    /**
     * The type of the node.
     */
    type: NodeType;
    /**
     * Name of the node.
     */
    name: string | null;
    /**
     * X Position of the node.
     */
    x: number | null;
    /**
     * Y Position of the node.
     */
    y: number | null;
    /**
     * Width of the node.
     */
    width: number | null;
    /**
     * Height of the node.
     */
    height: number | null;
    /**
     * Whether the node is visible.
     */
    visible: boolean;
    /**
     * Opacity of the node.
     */
    opacity: number;
    /**
     * Position constraints for the node within a group or the document.
     */
    constraints: LayoutConstraints | null;
    /**
     * An array of paths making up the geometry for a vector node.
     */
    paths: List<VectorPath> | null;
    /**
     * Child nodes for a group.
     */
    nodes: List<Node> | null;
    /**
     * Is the node a selection group.
     */
    selection: boolean;
    /**
     * Outline stroke fill  and vector nodes.
     */
    stroke: Fill | null;
    /**
     * Fill for shapes and vector nodes.
     */
    fill: Fill | null;
    /**
     * Weight of the outline stroke for shapes and vector nodes.
     */
    strokeWeight: number | null;
    /**
     * Outline stroke alignment for shapes and vector nodes.
     */
    strokeAlign: StrokeAlign | null;
    /**
     * DraftJS editor state.
     */
    editorState: EditorState | null;
    /**
     * The corner radius of a rectangle.
     */
    cornerRadius: number | null;
    /**
     * An array of corner radii for rectangles.
     */
    cornerRadii: List<number> | null;
}
declare const Node_base: Record.Factory<INode>;
export declare class Node extends Node_base implements Sizeable {
    constructor(props?: Partial<INode>);
    /**
     * Calculates the x position of a node containing sizeables.
     * @param sizeables The sizeables to base the position calculation.
     */
    private calculateX;
    /**
     * Calculates the y position of a node containing sizeables.
     * @param sizeables The sizeables to base the position calculation.
     */
    private calculateY;
    getX(): number;
    getY(): number;
    /**
     * Calculates the width of a node containing sizeables.
     * @param sizeables The sizeables to base the size calculation.
     */
    private calculateWidth;
    /**
     * Calculates the height of a node containing sizeables.
     * @param sizeables The sizeables to base the size calculation.
     */
    private calculateHeight;
    getWidth(): number;
    getHeight(): number;
    /**
     * Sets the x positions of sizeables based on the the computed x position of the node.
     * @param sizeables The sizeables to update.
     * @param x The new x position of the node.
     */
    private setSizeableXPositions;
    /**
     * Sets the y positions of sizeables based on the the computed y position of the node.
     * @param sizeables The sizeables to update.
     * @param y The new y position of the node.
     */
    private setSizeableYPositions;
    setX(x: number): this;
    setY(y: number): this;
    /**
     * Sets the widths of sizeables based on the the computed width of the node.
     * @param sizeables The sizeables to update.
     * @param width The new width of the node.
     */
    private setSizeableWidths;
    /**
     * Sets the heights of sizeables based on the the computed height of the node.
     * @param sizeables The sizeables to update.
     * @param height The new height of the node.
     */
    private setSizeableHeights;
    setWidth(width: number): this;
    setHeight(height: number): this;
    /**
     * Returns the border radius CSS for a node.
     */
    private getBorderRadiusCSS;
    /**
     * Returns the node as CSS properties.
     */
    toCSS(): CSSProperties;
}
export {};
