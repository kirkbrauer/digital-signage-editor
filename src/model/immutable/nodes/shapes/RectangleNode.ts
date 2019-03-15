import { ShapeNode, ShapeNodeConfig } from './ShapeNode';

export interface RectangleNodeConfig extends ShapeNodeConfig {
  cornerRadius?: number | null;
  cornerRadii?: number[] | null;
}

/**
 * A rectangle shape node.
 */
export class RectangleNode extends ShapeNode<RectangleNodeConfig> {

  /**
   * The corner radius.
   */
  private cornerRadius: number | null;

  /**
   * An array of corner radii.
   */
  private cornerRadii: number[];

  constructor(config: RectangleNodeConfig) {
    super(config);
    this.cornerRadius = config.cornerRadius || null;
    this.cornerRadii = config.cornerRadii || [];
  }

  public getCornerRadius(): number | null {
    return this.cornerRadius;
  }

  public setCornerRadius(cornerRadius: number): this {
    return this.cloneWith({
      cornerRadius
    });
  }

  public getCornerRadii(): number[] {
    return this.cornerRadii;
  }

  public setCornerRadii(cornerRadii: number[]): this {
    return this.cloneWith({
      cornerRadii
    });
  }

  public toRaw() { }

  public toJS(): RectangleNodeConfig {
    return {
      ...super.toJS(),
      cornerRadius: this.cornerRadius,
      cornerRadii: this.cornerRadii
    };
  }

}
