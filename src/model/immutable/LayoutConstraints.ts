import { Record } from 'immutable';
import { RawLayoutConstraints } from '../raw';
import { Serializable } from './Serializable';

/**
 * The layout constraints of a node.
 */
export interface ILayoutConstraints extends RawLayoutConstraints { }

export const defaultLayoutConstraints: ILayoutConstraints = {
  vertical: null,
  horizontal: null
};

export class LayoutConstraints extends Record<ILayoutConstraints>(defaultLayoutConstraints) implements Serializable<RawLayoutConstraints> {

  public toRaw(): RawLayoutConstraints {
    return {
      vertical: this.vertical,
      horizontal: this.horizontal
    };
  }

  public static fromRaw(raw: RawLayoutConstraints): LayoutConstraints {
    return new LayoutConstraints(raw);
  }

}
