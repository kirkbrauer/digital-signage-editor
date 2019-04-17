import { Record } from 'immutable';
import { Node } from './Node';
import { BoundingBox } from './BoundingBox';
import { Vector } from './Vector';
import { Size } from './Size';

export interface ISelectionBox {

  /**
   * The start position of the cursor.
   */
  startPos: Vector;

  /**
   * The current position of the cursor.
   */
  cursorPos: Vector;

}

export const defaultSelectionBox: ISelectionBox = {
  startPos: new Vector(),
  cursorPos: new Vector()
};

export class SelectionBox extends Record<ISelectionBox>(defaultSelectionBox) {

  /**
   * Returns the bounding box of the selection box.
   */
  public getBoundingBox(): BoundingBox {
    return new BoundingBox({
      position: this.getPosition(),
      size: this.getSize()
    });
  }

  /**
   * Returns the position of the selection box.
   */
  public getPosition(): Vector {
    return new Vector({
      x: Math.min(this.startPos.x, this.cursorPos.x),
      y: Math.min(this.startPos.y, this.cursorPos.y)
    });
  }

  /**
   * Returns the size of the bounding box.
   */
  public getSize(): Size {
    return new Size({
      width: Math.abs(this.cursorPos.x - this.startPos.x),
      height: Math.abs(this.cursorPos.y - this.startPos.y)
    });
  }

  /**
   * Returns true if the bounding box includes a node.
   * @param node The node to test against.
   */
  public includes(node: Node): boolean {
    return this.getBoundingBox().includes(node.getBoundingBox());
  }

}
