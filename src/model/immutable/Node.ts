import { Record, List } from 'immutable';
import { Sizeable } from './Sizeable';
import { LayoutConstraints } from './LayoutConstraints';
import { VectorPath } from './VectorPath';
import { Fill } from './Fill';
import { EditorState } from 'draft-js';
import uuid from 'uuid/v4';
import { CSSProperties } from 'react';
import { BoundingBox } from './BoundingBox';
import { NodeType, StrokeAlign } from '../raw';
import { Vector } from './Vector';
import { Size } from './Size';

/**
 * An editor node.
 */
export interface INode {
  
  /**
   * ID of the node.
   */
  id: string;

  /**
   * The type of the node.
   */
  type: NodeType;

  /**
   * Name of the node.
   */
  name: string | null;

  /**
   * The position of the node.
   */
  position: Vector | null;

  /**
   * The size of the node.
   */
  size: Size | null;

  /**
   * Whether the node is visible.
   */
  visible: boolean;

  /**
   * Opacity of the node.
   */
  opacity: number;

  /**
   * Position constraints for the node within a group or the document.
   */
  constraints: LayoutConstraints | null;

  /**
   * An array of paths making up the geometry for a vector node.
   */
  paths: List<VectorPath> | null;

  /**
   * Child nodes for a group.
   */
  nodes: List<Node> | null;

  /**
   * Is the node a selection group.
   */
  selection: boolean;

  /**
   * Outline stroke fill  and vector nodes.
   */
  stroke: Fill | null;

  /**
   * Fill for shapes and vector nodes.
   */
  fill: Fill | null;

  /**
   * Weight of the outline stroke for shapes and vector nodes.
   */
  strokeWeight: number | null;

  /**
   * Outline stroke alignment for shapes and vector nodes.
   */
  strokeAlign: StrokeAlign | null;

  /**
   * DraftJS editor state.
   */
  editorState: EditorState | null;

  /**
   * The corner radius of a rectangle.
   */
  cornerRadius: number | null;

  /**
   * An array of corner radii for rectangles.
   */
  cornerRadii: List<number> | null;

  /**
   * The rotation of the node in degrees.
   * 0-359 degrees.
   */
  rotation: number;
  
}

const defaultNode: INode = {
  id: '',
  type: NodeType.RECT,
  name: null,
  position: null,
  size: null,
  visible: true,
  opacity: 1.0,
  constraints: null,
  paths: null,
  nodes: null,
  selection: false,
  stroke: null,
  fill: null,
  strokeWeight: 0,
  strokeAlign: StrokeAlign.CENTER,
  editorState: EditorState.createEmpty(),
  cornerRadius: null,
  cornerRadii: null,
  rotation: 0
};

export class Node extends Record<INode>(defaultNode) implements Sizeable {

  constructor(props?: Partial<INode>) {
    // Generate a unique ID for each node if none is provided
    super({ ...props, id: (props && props.id) || uuid() });
  }

  public getBoundingBox(): BoundingBox {
    return new BoundingBox({
      position: this.getPosition(),
      size: this.getSize()
    });
  }

  public getTransformedBoundingBox(): BoundingBox {
    return this.getBoundingBox();
  }

  public getPosition(): Vector {
    // Return the position if the node has the property
    if (this.position !== null) {
      return this.position;
    }
    if (this.type === NodeType.GROUP) {
      return Sizeable.calculatePosition(this.nodes!);
    }
    if (this.type === NodeType.VECTOR) {
      return Sizeable.calculatePosition(this.paths!);
    }
    return new Vector();
  }

  public getSize(): Size {
    // Return the size if the node has the property
    if (this.size !== null) {
      return this.size;
    }
    if (this.type === NodeType.GROUP) {
      return Sizeable.calculateSize(this.nodes!);
    }
    if (this.type === NodeType.VECTOR) {
      return Sizeable.calculateSize(this.paths!);
    }
    return new Size();
  }

  public setPosition(position: Vector): this {
    if (this.position !== null) {
      return this.set('position', position);
    }
    if (this.type === NodeType.GROUP) {
      return this.set('nodes', Sizeable.setSizeablePositions(this.nodes!, position));
    }
    if (this.type === NodeType.VECTOR) {
      return this.set('paths', Sizeable.setSizeablePositions(this.paths!, position));
    }
    return this;
  }

  public setSize(size: Size): this {
    if (this.size !== null) {
      return this.set('size', size);
    }
    if (this.type === NodeType.GROUP) {
      return this.set('nodes', Sizeable.setSizeableSizes(this.nodes!, size));
    }
    if (this.type === NodeType.VECTOR) {
      return this.set('paths', Sizeable.setSizeableSizes(this.paths!, size));
    }
    return this;
  }

  /**
   * Returns the border radius CSS for a node.
   */
  private getBorderRadiusCSS(): CSSProperties {
    if (this.type === NodeType.RECT) {
      if (this.cornerRadii) {
        return {
          borderRadius: `${this.cornerRadii.get(0) || 0}px ${this.cornerRadii.get(1) || 0}px ${this.cornerRadii.get(2) || 0}px ${this.cornerRadii.get(3) || 0}px`
        };
      }
      if (this.cornerRadius) {
        return {
          borderRadius: `${this.cornerRadius}px`
        };
      }
    } else if (this.type === NodeType.ELLIPSE) {
      return {
        borderRadius: '50%'
      };
    }
    return {};
  }

  /**
   * Returns the node as CSS properties.
   * @param fillContainer Should the node fill its parent container div.
   */
  public toCSS(fillContainer?: boolean): CSSProperties {
    const fillStyle = this.fill ? this.fill.toFillCSS() : {};
    const strokeStyle = this.stroke ? this.stroke.toStrokeCSS(this.strokeWeight, this.strokeAlign) : {};
    const size = this.getSize();
    return {
      height: fillContainer ? '100%' : size.height,
      width: fillContainer ? '100%' : size.width,
      ...this.getBorderRadiusCSS(),
      ...fillStyle,
      ...strokeStyle
    };
  }

}
