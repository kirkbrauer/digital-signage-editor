import { ShapeNode, ShapeNodeConfig } from './ShapeNode';
import { Path } from '../../Path';
import { Vector } from '../../Vector';
export interface VectorNodeConfig extends ShapeNodeConfig {
    geometry: Path[];
}
/**
 * A vector shape node.
 */
export declare class VectorNode extends ShapeNode {
    /**
     * An array of relative paths making up the vector geometry.
     */
    geometry: Path[];
    constructor(config: VectorNodeConfig);
    setPosition(position: Vector): VectorNode;
    setHeight(height: number): VectorNode;
    setWidth(width: number): VectorNode;
    toJS(): VectorNodeConfig;
}
