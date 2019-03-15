import { Node, NodeConfig } from './Node';
import { VectorPath } from '../VectorPath';
import { Vector } from '../Vector';
export interface VectorNodeConfig extends NodeConfig {
    paths: VectorPath[];
}
/**
 * A vector shape node.
 */
export declare class VectorNode extends Node<VectorNodeConfig> {
    /**
     * An array of relative paths making up the vector geometry.
     */
    paths: VectorPath[];
    constructor(config: VectorNodeConfig);
    setPosition(position: Vector): this;
    getPosition(): Vector;
    getHeight(): number;
    setHeight(height: number): this;
    getWidth(): number;
    setWidth(width: number): this;
    toJS(): VectorNodeConfig;
    toRaw(): void;
}
