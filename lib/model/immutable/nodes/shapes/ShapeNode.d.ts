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
    private stroke;
    /**
     * Fill of the shape.
     */
    private fill;
    /**
     * Weight of the outline stroke.
     */
    private strokeWeight;
    /**
     * Outline stroke alignment.
     */
    private strokeAlign;
    private position;
    private height;
    private width;
    constructor(config: ShapeNodeConfig);
    /**
     * Returns the stroke.
     */
    getStroke(): Fill | null;
    /**
     * Sets the stroke.
     * @param stroke The new stroke.
     */
    setStroke(stroke: Fill | null): this;
    /**
     * Returns the fill.
     */
    getFill(): Fill | null;
    /**
     * Sets the fill.
     * @param fill The new fill.
     */
    setFill(fill: Fill | null): this;
    /**
     * Returns the stroke weight.
     */
    getStrokeWeight(): number | null;
    /**
     * Sets the the stroke weight.
     * @param strokeWeight The new stroke weight.
     */
    setStrokeWeight(strokeWeight: number | null): this;
    /**
     * Returns the stroke alignment.
     */
    getStrokeAlign(): StrokeAlign | null;
    /**
     * Sets the stroke alignment.
     * @param strokeAlign The new stroke weight.
     */
    setStrokeAlign(strokeAlign: StrokeAlign | null): this;
    getPosition(): Vector;
    setPosition(position: Vector): this;
    getHeight(): number;
    setHeight(height: number): this;
    getWidth(): number;
    setWidth(width: number): this;
    toJS(): ShapeNodeConfig;
    toRaw(): void;
}
