import { Record } from 'immutable';
import { Node } from './Node';
export interface ISelectionBox {
    startX: number;
    startY: number;
    cursorX: number;
    cursorY: number;
}
declare const SelectionBox_base: Record.Factory<ISelectionBox>;
export declare class SelectionBox extends SelectionBox_base {
    getX(): number;
    getY(): number;
    getWidth(): number;
    getHeight(): number;
    includes(node: Node): boolean;
}
export {};
