import { Record } from 'immutable';
import { RawSize } from '../raw';
import { Serializable } from './Serializable';

export interface ISize extends RawSize { }

export const defaultSize: ISize = {
  width: 0,
  height: 0
};

export class Size extends Record<ISize>(defaultSize) implements Serializable<RawSize> {

  public toRaw(): RawSize {
    return {
      width: this.width,
      height: this.height
    };
  }

  public static fromRaw(raw: RawSize): Size {
    return new Size(raw);
  }

}
