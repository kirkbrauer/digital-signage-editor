import { Record, List } from 'immutable';
import { Sizeable } from './Sizeable';
import { LayoutConstraints } from './LayoutConstraints';
import { VectorPath } from './VectorPath';
import { Fill } from './Fill';
import { EditorState } from 'draft-js';
import { CSSProperties } from 'react';
import { BoundingBox } from './BoundingBox';
import { NodeType, StrokeAlign } from '../raw';
import { Vector } from './Vector';
import { Size } from './Size';
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
     * The position of the node.
     */
    position: Vector | null;
    /**
     * The size of the node.
     */
    size: Size | null;
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
    getPosition(): Vector;
    getSize(): Size;
    setPosition(position: Vector): this;
    setSize(size: Size): this;
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
