import { Record } from 'immutable';
import { RawVector } from '../raw';
import { Serializable } from './Serializable';

export interface IVector extends RawVector { }

export const defaultVector: IVector = {
  x: 0,
  y: 0
};

export class Vector extends Record<IVector>(defaultVector) implements Serializable<RawVector> {

  public toRaw(): RawVector {
    return {
      x: this.x,
      y: this.y
    };
  }

  public static fromRaw(raw: RawVector): Vector {
    return new Vector(raw);
  }

}
