import { Record } from 'immutable';
import { RawVector } from '../raw';
import { Serializable } from './Serializable';
export interface IVector extends RawVector {
}
export declare const defaultVector: IVector;
declare const Vector_base: Record.Factory<IVector>;
export declare class Vector extends Vector_base implements Serializable<RawVector> {
    toRaw(): RawVector;
    static fromRaw(raw: RawVector): Vector;
}
export {};
