import { Node, NodeConfig } from './Node';
import { Vector } from '../Vector';
export interface GroupNodeConfig extends NodeConfig {
    nodes?: Node[];
}
/**
 * A node representing a group of other nodes.
 */
export declare class GroupNode extends Node<GroupNodeConfig> {
    /**
     * Child nodes in the group.
     */
    private nodes;
    constructor(config: GroupNodeConfig);
    getNodes(): Node[];
    getPosition(): Vector;
    setPosition(position: Vector): this;
    getHeight(): number;
    setHeight(height: number): this;
    getWidth(): number;
    setWidth(width: number): this;
    toJS(): GroupNodeConfig;
    toRaw(): void;
}
