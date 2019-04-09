import { RawDraftContentState } from 'draft-js';
import { RawLayoutConstraints } from './RawLayoutConstraints';
import { RawFill } from './RawFill';
import { RawVectorPath } from './RawVectorPath';
import { RawVector } from './RawVector';
import { RawSize } from './RawSize';
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
export interface RawNode {
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
    position: RawVector | null;
    /**
     * The size of the node.
     */
    size: RawSize | null;
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
    constraints: RawLayoutConstraints | null;
    /**
     * An array of paths making up the geometry for a vector node.
     */
    paths: RawVectorPath[] | null;
    /**
     * Child nodes for a group.
     */
    nodes: RawNode[] | null;
    /**
     * Is the node a selection group.
     */
    selection: boolean;
    /**
     * Outline stroke fill  and vector nodes.
     */
    stroke: RawFill | null;
    /**
     * Fill for shapes and vector nodes.
     */
    fill: RawFill | null;
    /**
     * Weight of the outline stroke for shapes and vector nodes.
     */
    strokeWeight: number | null;
    /**
     * Outline stroke alignment for shapes and vector nodes.
     */
    strokeAlign: StrokeAlign | null;
    /**
     * DraftJS raw content.
     */
    content: RawDraftContentState | null;
    /**
     * The corner radius of a rectangle.
     */
    cornerRadius: number | null;
    /**
     * An array of corner radii for rectangles.
     */
    cornerRadii: number[] | null;
    /**
     * The rotation of the node in degrees.
     * 0-359 degrees.
     */
    rotation: number;
}
