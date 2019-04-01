import { Record, List } from 'immutable';
import { Sizeable } from './Sizeable';
import { LayoutConstraints } from './LayoutConstraints';
import { VectorPath } from './VectorPath';
import { Fill } from './Fill';
import { EditorState } from 'draft-js';
import uuid from 'uuid/v4';
import { CSSProperties } from 'react';

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
  cornerRadii: null
};

export class Node extends Record<INode>(defaultNode) implements Sizeable {

  constructor(props?: Partial<INode>) {
    // Generate a unique ID for each node if none is provided
    super({ ...props, id: (props && props.id) || uuid() });
  }

  /**
   * Calculates the x position of a node containing sizeables.
   * @param sizeables The sizeables to base the position calculation.
   */
  private calculateX(sizeables: List<Sizeable>): number {
    // Get the min x values
    let minX = sizeables.get(0)!.getX();
    for (const sizeable of sizeables) {
      if (sizeable.getX() < minX) {
        minX = sizeable.getX();
      }
    }
    return minX;
  }

  /**
   * Calculates the y position of a node containing sizeables.
   * @param sizeables The sizeables to base the position calculation.
   */
  private calculateY(sizeables: List<Sizeable>): number {
    // Get the min y values
    let minY = sizeables.get(0)!.getY();
    for (const sizeable of sizeables) {
      if (sizeable.getY() < minY) {
        minY = sizeable.getY();
      }
    }
    return minY;
  }

  public getX(): number {
    // Return the x pos if the node has the property
    if (this.x !== null) {
      return this.x;
    }
    if (this.type === NodeType.GROUP) {
      return this.calculateX(this.nodes!);
    }
    if (this.type === NodeType.VECTOR) {
      return this.calculateX(this.paths!);
    }
    return 0;
  }

  public getY(): number {
    // Return the y pos if the node has the property
    if (this.y !== null) {
      return this.y;
    }
    if (this.type === NodeType.GROUP) {
      return this.calculateY(this.nodes!);
    }
    if (this.type === NodeType.VECTOR) {
      return this.calculateY(this.paths!);
    }
    return 0;
  }

  /**
   * Calculates the width of a node containing sizeables.
   * @param sizeables The sizeables to base the size calculation.
   */
  private calculateWidth<T extends Sizeable>(sizeables: List<T>): number {
    // Find the maximum x positions of the sizeables
    let maxX = sizeables.get(0)!.getX() + sizeables.get(0)!.getWidth();
    for (const sizeable of sizeables) {
      if (sizeable.getX() + sizeable.getWidth() > maxX) {
        maxX = sizeable.getX() + sizeable.getWidth();
      }
    }
    // Return the max x minus the min x
    return maxX - this.getX();
  }

  /**
   * Calculates the height of a node containing sizeables.
   * @param sizeables The sizeables to base the size calculation.
   */
  private calculateHeight<T extends Sizeable>(sizeables: List<T>): number {
    // Find the maximum y positions of the sizeables
    let maxY = sizeables.get(0)!.getY() + sizeables.get(0)!.getHeight();
    for (const sizeable of sizeables) {
      if (sizeable.getY() + sizeable.getHeight() > maxY) {
        maxY = sizeable.getY() + sizeable.getHeight();
      }
    }
    // Return the max x minus the min x
    return maxY - this.getY();
  }

  public getWidth(): number {
    // Return the width if the node has the property
    if (this.width !== null) {
      return this.width;
    }
    if (this.type === NodeType.GROUP) {
      return this.calculateWidth(this.nodes!);
    }
    if (this.type === NodeType.VECTOR) {
      return this.calculateWidth(this.paths!);
    }
    return 0;
  }

  public getHeight(): number {
    // Return the height if the node has the property
    if (this.height !== null) {
      return this.height;
    }
    if (this.type === NodeType.GROUP) {
      return this.calculateHeight(this.nodes!);
    }
    if (this.type === NodeType.VECTOR) {
      return this.calculateHeight(this.paths!);
    }
    return 0;
  }

  /**
   * Sets the x positions of sizeables based on the the computed x position of the node.
   * @param sizeables The sizeables to update.
   * @param x The new x position of the node.
   */
  private setSizeableXPositions<T extends Sizeable>(sizeables: List<T>, x: number): List<T> {
    return sizeables.map((sizeable) => {
      // Calculate the offset between the sizeable position and the node position
      const offset = sizeable.getX() - this.getX();
      // Set the node x to the new position + the offset
      return sizeable.setX(x + offset);
    });
  }

  /**
   * Sets the y positions of sizeables based on the the computed y position of the node.
   * @param sizeables The sizeables to update.
   * @param y The new y position of the node.
   */
  private setSizeableYPositions<T extends Sizeable>(sizeables: List<T>, y: number): List<T> {
    return sizeables.map((sizeable) => {
      // Calculate the offset between the sizeable position and the node position
      const offset = sizeable.getY() - this.getY();
      // Set the node y to the new position + the offset
      return sizeable.setY(y + offset);
    });
  }

  public setX(x: number): this {
    if (this.x !== null) {
      return this.set('x', x);
    }
    if (this.type === NodeType.GROUP) {
      return this.set('nodes',
        this.setSizeableXPositions(this.nodes!, x)
      );
    }
    if (this.type === NodeType.VECTOR) {
      return this.set('paths',
        this.setSizeableXPositions(this.paths!, x)
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
        this.setSizeableYPositions(this.nodes!, y)
      );
    }
    if (this.type === NodeType.VECTOR) {
      return this.set('paths',
        this.setSizeableYPositions(this.paths!, y)
      );
    }
    return this;
  }

  /**
   * Sets the widths of sizeables based on the the computed width of the node.
   * @param sizeables The sizeables to update.
   * @param width The new width of the node.
   */
  private setSizeableWidths<T extends Sizeable>(sizeables: List<T>, width: number): List<T> {
    return sizeables.map((sizeable) => {
      // Calculate the ratio of the width of the sizeable to the node's width
      const widthRatio = sizeable.getWidth() / this.getWidth();
      // Calculate the offset between the sizeable's position and the node's position
      const offset = sizeable.getX() - this.getX();
      // Calculate the ratio of the offset to the actual width of the node
      const posRatio = offset / this.getWidth();
      // Set the x position and width of the node
      return sizeable.setX(this.getX() + (posRatio * width)).setWidth(widthRatio * width);
    });
  }

  /**
   * Sets the heights of sizeables based on the the computed height of the node.
   * @param sizeables The sizeables to update.
   * @param height The new height of the node.
   */
  private setSizeableHeights<T extends Sizeable>(sizeables: List<T>, width: number): List<T> {
    return sizeables.map((sizeable) => {
      // Calculate the ratio of the height of the sizeable to the node's height
      const heightRatio = sizeable.getHeight() / this.getHeight();
      // Calculate the offset between the sizeable's position and the node's position
      const offset = sizeable.getY() - this.getY();
      // Calculate the ratio of the offset to the actual height of the node
      const posRatio = offset / this.getHeight();
      // Set the y position and height of the node
      return sizeable.setY(this.getY() + (posRatio * width)).setHeight(heightRatio * width);
    });
  }

  public setWidth(width: number): this {
    if (this.width !== null) {
      return this.set('width', width);
    }
    if (this.type === NodeType.GROUP) {
      return this.set('nodes',
        this.setSizeableWidths(this.nodes!, width)
      );
    }
    if (this.type === NodeType.VECTOR) {
      return this.set('paths',
        this.setSizeableWidths(this.paths!, width)
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
        this.setSizeableHeights(this.nodes!, height)
      );
    }
    if (this.type === NodeType.VECTOR) {
      return this.set('paths',
        this.setSizeableHeights(this.paths!, height)
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
   */
  public toCSS(): CSSProperties {
    const fillStyle = this.fill ? this.fill.toFillCSS() : {};
    const strokeStyle = this.stroke ? this.stroke.toStrokeCSS(this.strokeWeight, this.strokeAlign) : {};
    return {
      height: this.getHeight(),
      width: this.getWidth(),
      ...this.getBorderRadiusCSS(),
      ...fillStyle,
      ...strokeStyle
    };
  }

}
