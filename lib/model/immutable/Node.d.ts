import { Record, List } from 'immutable';
import { Sizeable } from './Sizeable';
import { LayoutConstraints } from './LayoutConstraints';
import { VectorPath } from './VectorPath';
import { Fill } from './Fill';
import { EditorState } from 'draft-js';
import { CSSProperties } from 'react';
import { BoundingBox } from './BoundingBox';
import { Size } from './Size';
import { Position } from './Position';
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
    /**
     * The rotation of the node in degrees.
     * 0-359 degrees.
     */
    rotation: number;
}
declare const Node_base: Record.Factory<INode>;
export declare class Node extends Node_base implements Sizeable {
    constructor(props?: Partial<INode>);
    getBoundingBox(): BoundingBox;
    getTransformedBoundingBox(): BoundingBox;
    getSize(): Size;
    getPosition(): Position;
    getX(): number;
    getY(): number;
    getWidth(): number;
    getHeight(): number;
    setPosition(position: Position): this;
    setSize(size: Size): this;
    setX(x: number): this;
    setY(y: number): this;
    setWidth(width: number): this;
    setHeight(height: number): this;
    /**
     * Returns the border radius CSS for a node.
     */
    private getBorderRadiusCSS;
    /**
     * Returns the node as CSS properties.
     * @param fillContainer Should the node fill its parent container div.
     */
    toCSS(fillContainer?: boolean): CSSProperties;
}
export {};
