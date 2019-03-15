import { Node, NodeConfig } from '../Node';
import { Fill } from '../../Fill';
import { Vector } from '../../Vector';
export interface ShapeNodeConfig extends NodeConfig {
    stroke?: Fill | null;
    fill?: Fill | null;
    strokeWeight?: number | null;
    strokeAlign?: StrokeAlign | null;
    position?: Vector;
    height?: number;
    width?: number;
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
 * A shape node.
 */
export declare abstract class ShapeNode<T extends ShapeNodeConfig = ShapeNodeConfig, R = any> extends Node<ShapeNodeConfig | T, R> {
    /**
     * Outline stroke color.
     */
    stroke: Fill | null;
    /**
     * Fill of the shape.
     */
    fill: Fill | null;
    /**
     * Weight of the outline stroke.
     */
    strokeWeight: number | null;
    /**
     * Outline stroke alignment.
     */
    strokeAlign: StrokeAlign | null;
    private position;
    private height;
    private width;
    constructor(config: ShapeNodeConfig);
    getPosition(): Vector;
    setPosition(position: Vector): this;
    getHeight(): number;
    setHeight(height: number): this;
    getWidth(): number;
    setWidth(width: number): this;
    toJS(): ShapeNodeConfig;
    toRaw(): void;
}
