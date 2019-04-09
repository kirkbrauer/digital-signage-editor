import { Record } from 'immutable';
import { Node } from './Node';
import { BoundingBox } from './BoundingBox';
import { Vector } from './Vector';
import { Size } from './Size';

export interface ISelectionBox {

  startPos: Vector;

  cursorPos: Vector;

}

const defaultSelectionBox: ISelectionBox = {
  startPos: new Vector(),
  cursorPos: new Vector()
};

export class SelectionBox extends Record<ISelectionBox>(defaultSelectionBox) {

  public getBoundingBox(): BoundingBox {
    return new BoundingBox({
      position: this.getPosition(),
      size: this.getSize()
    });
  }

  public getPosition(): Vector {
    return new Vector({
      x: Math.min(this.startPos.x, this.cursorPos.x),
      y: Math.min(this.startPos.y, this.cursorPos.y)
    });
  }

  public getSize(): Size {
    return new Size({
      width: Math.abs(this.cursorPos.x - this.startPos.x),
      height: Math.abs(this.cursorPos.y - this.startPos.y)
    });
  }

  public includes(node: Node): boolean {
    return this.getBoundingBox().includes(node.getBoundingBox());
  }

}
