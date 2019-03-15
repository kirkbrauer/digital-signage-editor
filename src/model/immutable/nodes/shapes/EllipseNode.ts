import { ShapeNode, ShapeNodeConfig } from './ShapeNode';

export interface EllipseNodeConfig extends ShapeNodeConfig { }

/**
 * An ellipse node.
 */
export class EllipseNode extends ShapeNode<EllipseNodeConfig> {

  public toRaw() { }

}
