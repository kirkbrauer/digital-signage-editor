import { Record } from 'immutable';
import { Node } from './Node';
import { BoundingBox } from './BoundingBox';

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

  public getBoundingBox(): BoundingBox {
    return new BoundingBox({
      x: this.getX(),
      y: this.getY(),
      width: this.getWidth(),
      height: this.getHeight()
    });
  }

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
    return this.getBoundingBox().includes(node.getBoundingBox());
  }

}
