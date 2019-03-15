import { ShapeNode, ShapeNodeConfig } from './ShapeNode';
export interface EllipseNodeConfig extends ShapeNodeConfig {
}
/**
 * An ellipse node.
 */
export declare class EllipseNode extends ShapeNode<EllipseNodeConfig> {
    toRaw(): void;
}
