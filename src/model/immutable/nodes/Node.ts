import { LayoutConstraints } from '../LayoutConstraints';
import { Sizeable } from '../Sizeable';
import { Vector } from '../Vector';
import shortid from 'shortid';

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
export abstract class Node<T extends NodeConfig = NodeConfig, R = any> extends Sizeable<NodeConfig | T, R> {
  
  /**
   * ID of the node.
   */
  private id: string;

  /**
   * Name of the node.
   */
  private name: string | null;

  /**
   * Whether the node is visible.
   */
  private visible: boolean;

  /**
   * Whether to preserve the ratio of the node when resizing.
   */
  private preserveRatio: boolean;

  /**
   * Opacity of the node
   */
  private opacity: number;

  /**
   * The Z-index of the node.
   */
  private zIndex: number;

  /**
   * Position constraints for the node within a group or the document.
   */
  private constraints: LayoutConstraints | null;

  constructor(config: NodeConfig) {
    super();
    this.id = config.id || shortid.generate();
    this.name = config.name || null;
    this.visible = config.visible || true;
    this.preserveRatio = config.preserveRatio || false;
    this.opacity = config.opacity || 1.0;
    this.zIndex = config.zIndex || 0;
    this.constraints = config.constraints || null;
  }

  public abstract setPosition(position: Vector): this;

  public abstract setHeight(height: number): this;

  public abstract setWidth(width: number): this;

  public getID(): string {
    return this.id;
  }

  public getName(): string | null {
    return this.name;
  }

  public setName(name: string): this {
    return this.cloneWith({
      name
    });
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public hide(): this {
    return this.cloneWith({
      visible: false
    });
  }

  public show(): this {
    return this.cloneWith({
      visible: true
    });
  }

  public shouldPreserveRatio(): boolean {
    return this.preserveRatio;
  }

  public setPreserveRatio(preserveRatio: boolean): this {
    return this.cloneWith({
      preserveRatio
    });
  }

  public getOpacity(): number {
    return this.opacity;
  }

  public setOpacity(opacity: number): this {
    return this.cloneWith({
      opacity
    });
  }

  public getZIndex(): number {
    return this.zIndex;
  }

  public setZIndex(zIndex: number): this {
    return this.cloneWith({
      zIndex
    });
  }

  public getConstraints(): LayoutConstraints | null {
    return this.constraints;
  }

  public setConstraints(constraints: LayoutConstraints | null): this {
    return this.cloneWith({
      constraints
    });
  }

  public toJS(): NodeConfig {
    return {
      id: this.id,
      name: this.name,
      visible: this.visible,
      preserveRatio: this.preserveRatio,
      opacity: this.opacity,
      zIndex: this.zIndex,
      constraints: this.constraints
    };
  }

  public toRaw(): any { }
  
}
