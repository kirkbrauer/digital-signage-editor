import { Record } from 'immutable';
import { RawSize } from '../raw';

export interface ISize extends RawSize { }

const defaultSize: ISize = {
  width: 0,
  height: 0
};

export class Size extends Record<ISize>(defaultSize) { }