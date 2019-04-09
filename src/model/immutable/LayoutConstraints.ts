import { Record } from 'immutable';
import { RawLayoutConstraints } from '../raw';

/**
 * The layout constraints of a node.
 */
export interface ILayoutConstraints extends RawLayoutConstraints { }

const defaultLayoutConstraints: ILayoutConstraints = {
  vertical: null,
  horizontal: null
};

export class LayoutConstraints extends Record<ILayoutConstraints>(defaultLayoutConstraints) { }
