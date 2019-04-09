import { Record } from 'immutable';
import { RawVector } from '../raw';

export interface IVector extends RawVector { }

const defaultVector: IVector = {
  x: 0,
  y: 0
};

export class Vector extends Record<IVector>(defaultVector) { }