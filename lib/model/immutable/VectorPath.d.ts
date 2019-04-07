import { VectorPoint } from './VectorPoint';
import { Sizeable } from './Sizeable';
import { Record, List } from 'immutable';
import { BoundingBox } from './BoundingBox';
import { Size } from './Size';
import { Position } from './Position';
/**
 * A vector path.
 */
export interface VectorPathProps {
    /**
     * The ID of the vector path.
     */
    id: string;
    /**
     * The absolute x position of the path.
     */
    x: number;
    /**
    * The absolute x position of the path.
    */
    y: number;
    /**
     * An array of points that make up the path.
     */
    points: List<VectorPoint>;
    /**
     * Whether the path is open.
     * Paths open between their first and last points.
     */
    open?: boolean;
}
declare const VectorPath_base: Record.Factory<VectorPathProps>;
export declare class VectorPath extends VectorPath_base implements Sizeable {
    constructor(props?: Partial<VectorPathProps>);
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
}
export {};
