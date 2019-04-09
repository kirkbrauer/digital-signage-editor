import { Record } from 'immutable';
import { Node } from './Node';
import { BoundingBox } from './BoundingBox';
import { Vector } from './Vector';
import { Size } from './Size';
export interface ISelectionBox {
    startPos: Vector;
    cursorPos: Vector;
}
declare const SelectionBox_base: Record.Factory<ISelectionBox>;
export declare class SelectionBox extends SelectionBox_base {
    getBoundingBox(): BoundingBox;
    getPosition(): Vector;
    getSize(): Size;
    includes(node: Node): boolean;
}
export {};
