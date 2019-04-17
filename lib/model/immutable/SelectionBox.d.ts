import { Record } from 'immutable';
import { Node } from './Node';
import { BoundingBox } from './BoundingBox';
import { Vector } from './Vector';
import { Size } from './Size';
export interface ISelectionBox {
    /**
     * The start position of the cursor.
     */
    startPos: Vector;
    /**
     * The current position of the cursor.
     */
    cursorPos: Vector;
}
export declare const defaultSelectionBox: ISelectionBox;
declare const SelectionBox_base: Record.Factory<ISelectionBox>;
export declare class SelectionBox extends SelectionBox_base {
    /**
     * Returns the bounding box of the selection box.
     */
    getBoundingBox(): BoundingBox;
    /**
     * Returns the position of the selection box.
     */
    getPosition(): Vector;
    /**
     * Returns the size of the bounding box.
     */
    getSize(): Size;
    /**
     * Returns true if the bounding box includes a node.
     * @param node The node to test against.
     */
    includes(node: Node): boolean;
}
export {};
