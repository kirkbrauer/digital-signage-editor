import { ShapeNode, ShapeNodeConfig } from './ShapeNode';
export interface RectangleNodeConfig extends ShapeNodeConfig {
    cornerRadius?: number | null;
    cornerRadii?: number[] | null;
}
/**
 * A rectangle shape node.
 */
export declare class RectangleNode extends ShapeNode<RectangleNodeConfig> {
    /**
     * The corner radius.
     */
    private cornerRadius;
    /**
     * An array of corner radii.
     */
    private cornerRadii;
    constructor(config: RectangleNodeConfig);
    getCornerRadius(): number | null;
    setCornerRadius(cornerRadius: number): this;
    getCornerRadii(): number[];
    setCornerRadii(cornerRadii: number[]): this;
    toRaw(): void;
    toJS(): RectangleNodeConfig;
}
