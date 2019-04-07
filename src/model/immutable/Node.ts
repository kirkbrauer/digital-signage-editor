import { Record, List } from 'immutable';
import { Sizeable } from './Sizeable';
import { LayoutConstraints } from './LayoutConstraints';
import { VectorPath } from './VectorPath';
import { Fill } from './Fill';
import { EditorState } from 'draft-js';
import uuid from 'uuid/v4';
import { CSSProperties } from 'react';
import { BoundingBox } from './BoundingBox';
import { Size } from './Size';
import { Position } from './Position';

/**
 * Defines node types.
 */
export enum NodeType {
  GROUP = 'GROUP',
  VECTOR = 'VECTOR',
  ELLIPSE = 'ELLIPSE',
  RECT = 'RECT',
  TEXT = 'TEXT'
}

/**
 * Defines stroke alignments.
 */
export enum StrokeAlign {
  INSIDE = 'INSIDE',
  OUTSIDE = 'OUTSIDE',
  CENTER = 'CENTER'
}

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
   * X Position of the node.
   */
  x: number | null;

  /**
   * Y Position of the node.
   */
  y: number | null;

  /**
   * Width of the node.
   */
  width: number | null;

  /**
   * Height of the node.
   */
  height: number | null;

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
  x: null,
  y: null,
  width: null,
  height: null,
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

  public getBoundingBox() {
    return new BoundingBox({
      x: this.getX(),
      y: this.getY(),
      width: this.getWidth(),
      height: this.getHeight()
    });
  }

  public getTransformedBoundingBox() {
    return new BoundingBox({
      x: this.getX(),
      y: this.getY(),
      width: this.getWidth(),
      height: this.getHeight()
    });
  }

  public getSize(): Size {
    return {
      width: this.getWidth(),
      height: this.getHeight()
    };
  }

  public getPosition(): Position {
    return {
      x: this.getX(),
      y: this.getY()
    };
  }

  public getX(): number {
    // Return the x pos if the node has the property
    if (this.x !== null) {
      return this.x;
    }
    if (this.type === NodeType.GROUP) {
      return Sizeable.calculateX(this.nodes!);
    }
    if (this.type === NodeType.VECTOR) {
      return Sizeable.calculateX(this.paths!);
    }
    return 0;
  }

  public getY(): number {
    // Return the y pos if the node has the property
    if (this.y !== null) {
      return this.y;
    }
    if (this.type === NodeType.GROUP) {
      return Sizeable.calculateY(this.nodes!);
    }
    if (this.type === NodeType.VECTOR) {
      return Sizeable.calculateY(this.paths!);
    }
    return 0;
  }

  public getWidth(): number {
    // Return the width if the node has the property
    if (this.width !== null) {
      return this.width;
    }
    if (this.type === NodeType.GROUP) {
      return Sizeable.calculateWidth(this.nodes!, this.getX());
    }
    if (this.type === NodeType.VECTOR) {
      return Sizeable.calculateWidth(this.paths!, this.getX());
    }
    return 0;
  }

  public getHeight(): number {
    // Return the height if the node has the property
    if (this.height !== null) {
      return this.height;
    }
    if (this.type === NodeType.GROUP) {
      return Sizeable.calculateHeight(this.nodes!, this.getY());
    }
    if (this.type === NodeType.VECTOR) {
      return Sizeable.calculateHeight(this.paths!, this.getY());
    }
    return 0;
  }

  public setPosition(position: Position): this {
    return this.setX(position.x).setY(position.y);
  }

  public setSize(size: Size): this {
    return this.setWidth(size.width).setHeight(size.height);
  }

  public setX(x: number): this {
    if (this.x !== null) {
      return this.set('x', x);
    }
    if (this.type === NodeType.GROUP) {
      return this.set('nodes',
        Sizeable.setSizeableXPositions(this.nodes!, this.getX(), x)
      );
    }
    if (this.type === NodeType.VECTOR) {
      return this.set('paths',
        Sizeable.setSizeableXPositions(this.paths!, this.getX(), x)
      );
    }
    return this;
  }

  public setY(y: number): this {
    if (this.y !== null) {
      return this.set('y', y);
    }
    if (this.type === NodeType.GROUP) {
      return this.set('nodes',
        Sizeable.setSizeableYPositions(this.nodes!, this.getY(), y)
      );
    }
    if (this.type === NodeType.VECTOR) {
      return this.set('paths',
        Sizeable.setSizeableYPositions(this.paths!, this.getY(), y)
      );
    }
    return this;
  }

  public setWidth(width: number): this {
    if (this.width !== null) {
      return this.set('width', width);
    }
    if (this.type === NodeType.GROUP) {
      return this.set('nodes',
        Sizeable.setSizeableWidths(this.nodes!, this.getX(), this.getWidth(), width)
      );
    }
    if (this.type === NodeType.VECTOR) {
      return this.set('paths',
        Sizeable.setSizeableWidths(this.paths!, this.getX(), this.getWidth(), width)
      );
    }
    return this;
  }

  public setHeight(height: number): this {
    if (this.height !== null) {
      return this.set('height', height);
    }
    if (this.type === NodeType.GROUP) {
      return this.set('nodes',
        Sizeable.setSizeableHeights(this.nodes!, this.getY(), this.getHeight(), height)
      );
    }
    if (this.type === NodeType.VECTOR) {
      return this.set('paths',
        Sizeable.setSizeableHeights(this.paths!, this.getY(), this.getHeight(), height)
      );
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
    return {
      height: fillContainer ? '100%' : this.getHeight(),
      width: fillContainer ? '100%' : this.getWidth(),
      ...this.getBorderRadiusCSS(),
      ...fillStyle,
      ...strokeStyle
    };
  }

}
