import { Record } from 'immutable';
import { RawSize } from '../raw';
import { Serializable } from './Serializable';
export interface ISize extends RawSize {
}
export declare const defaultSize: ISize;
declare const Size_base: Record.Factory<ISize>;
export declare class Size extends Size_base implements Serializable<RawSize> {
    toRaw(): RawSize;
    static fromRaw(raw: RawSize): Size;
}
export {};
