import { LayoutConstraints } from '../LayoutConstraints';
import { Sizeable } from '../Sizeable';
import { Vector } from '../Vector';
export interface NodeConfig {
    id?: string;
    name?: string | null;
    visible?: boolean;
    preserveRatio?: boolean;
    opacity?: number;
    zIndex?: number;
    constraints?: LayoutConstraints | null;
}
/**
 * An editor node.
 */
export declare abstract class Node<T extends NodeConfig = NodeConfig, R = any> extends Sizeable<NodeConfig | T, R> {
    /**
     * ID of the node.
     */
    private id;
    /**
     * Name of the node.
     */
    private name;
    /**
     * Whether the node is visible.
     */
    private visible;
    /**
     * Whether to preserve the ratio of the node when resizing.
     */
    private preserveRatio;
    /**
     * Opacity of the node
     */
    private opacity;
    /**
     * The Z-index of the node.
     */
    private zIndex;
    /**
     * Position constraints for the node within a group or the document.
     */
    private constraints;
    constructor(config: NodeConfig);
    abstract setPosition(position: Vector): this;
    abstract setHeight(height: number): this;
    abstract setWidth(width: number): this;
    getID(): string;
    getName(): string | null;
    setName(name: string): this;
    isVisible(): boolean;
    hide(): this;
    show(): this;
    shouldPreserveRatio(): boolean;
    setPreserveRatio(preserveRatio: boolean): this;
    getOpacity(): number;
    setOpacity(opacity: number): this;
    getZIndex(): number;
    setZIndex(zIndex: number): this;
    getConstraints(): LayoutConstraints | null;
    setConstraints(constraints: LayoutConstraints | null): this;
    toJS(): NodeConfig;
    toRaw(): any;
}
