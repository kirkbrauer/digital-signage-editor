import { Record } from 'immutable';
import { RawVector } from '../raw';
export interface IVector extends RawVector {
}
declare const Vector_base: Record.Factory<IVector>;
export declare class Vector extends Vector_base {
}
export {};
