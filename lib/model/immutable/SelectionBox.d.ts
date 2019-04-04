import { Record } from 'immutable';
import { Node } from './Node';
import { BoundingBox } from './BoundingBox';
export interface ISelectionBox {
    startX: number;
    startY: number;
    cursorX: number;
    cursorY: number;
}
declare const SelectionBox_base: Record.Factory<ISelectionBox>;
export declare class SelectionBox extends SelectionBox_base {
    getBoundingBox(): BoundingBox;
    getX(): number;
    getY(): number;
    getWidth(): number;
    getHeight(): number;
    includes(node: Node): boolean;
}
export {};
