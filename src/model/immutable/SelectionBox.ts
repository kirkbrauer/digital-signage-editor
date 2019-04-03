import { Record } from 'immutable';
import { Node } from './Node';

export interface ISelectionBox {

  startX: number;

  startY: number;

  cursorX: number;

  cursorY: number;

}

const defaultSelectionBox = {
  startX: 0,
  startY: 0,
  cursorX: 0,
  cursorY: 0
};

export class SelectionBox extends Record<ISelectionBox>(defaultSelectionBox) {

  public getX(): number {
    return Math.min(this.startX, this.cursorX);
  }

  public getY(): number {
    return Math.min(this.startY, this.cursorY);
  }

  public getWidth(): number {
    return Math.abs(this.cursorX - this.startX);
  }

  public getHeight(): number {
    return Math.abs(this.cursorY - this.startY);
  }

  public includes(node: Node): boolean {
    // Calculate the max and min positions of the node
    const nodeMinX = node.getX();
    const nodeMinY = node.getY();
    const nodeMaxX = node.getX() + node.getWidth();
    const nodeMaxY = node.getY() + node.getHeight();
    const minX = this.getX();
    const minY = this.getY();
    const maxX = this.getX() + this.getWidth();
    const maxY = this.getY() + this.getHeight();
    // Check if any corners of the node are inside the selection box
    if ((nodeMinX >= minX && nodeMinX <= maxX) || (nodeMaxX >= minX && nodeMaxX <= maxX)) {
      if ((nodeMinY >= minY && nodeMinY <= maxY) || (nodeMaxY >= minY && nodeMaxY <= maxY)) {
        return true;
      }
    }
    // Check if any corners of the selection box are inside the node
    if ((minX >= nodeMinX && minX <= nodeMaxX) || (maxX >= nodeMinX && maxX <= nodeMaxX)) {
      if ((minY >= nodeMinY && minY <= nodeMaxY) || (maxY >= nodeMinY && maxY <= nodeMaxY)) {
        return true;
      }
    }
    return false;
  }

}
