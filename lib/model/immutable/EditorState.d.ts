import { Record, List } from 'immutable';
import { Document } from './Document';
import { Node } from './Node';
import { SelectionBox } from './SelectionBox';
import { BoundingBox } from './BoundingBox';
export interface IEditorState {
    /**
     * Current document.
     */
    document: Document;
    /**
     * The IDs of the currently selected nodes.
     */
    selectedIDs: List<string>;
    /**
     * The ID of the node that is being edited.
     */
    editing: string | null;
    /**
     * The current clipboard contents.
     */
    clipboard: List<Node>;
    /**
     * The user's selection box.
     */
    selectionBox: SelectionBox | null;
}
declare const EditorState_base: Record.Factory<IEditorState>;
export declare class EditorState extends EditorState_base {
    /**
     * Creates an editor state of a document.
     * @param document The document.
     */
    static of(document: Document): EditorState;
    /**
     * Returns the bounding box of a selection.
     */
    getSelectionBoundingBox(): BoundingBox;
    /**
     * Returns the x position of the current selection.
     */
    getSelectionX(): number;
    /**
     * Returns the y position of the current selection.
     */
    getSelectionY(): number;
    /**
     * Returns the width of the current selection.
     */
    getSelectionWidth(): number;
    /**
     * Returns the height of the current selection.
     */
    getSelectionHeight(): number;
    /**
     * Returns the node that is currently being edited.
     */
    getEditNode(): Node | null;
    /**
     * Returns a list of currently selected nodes.
     */
    getSelectedNodes(): List<Node>;
    /**
     * Selects a node.
     * @param id The ID of the node to select.
     * @param multiple Should multiple nodes be allowed to be selected.
     */
    select(id: string, multiple: boolean): this;
    deselect(id: string): this;
    /**
     * Deselects all nodes.
     */
    deselectAll(): this;
    /**
     * Selects all nodes in the document.
     */
    selectAll(): this;
    /**
     * Copies nodes by ID.
     * @param ids The IDs of the nodes to copy.
     */
    copy(ids: List<string>): this;
    /**
     * Cuts nodes by ID.
     * @param ids The IDs of the nodes to cut.
     */
    cut(ids: List<string>): this;
    /**
     * Pastes the clipboard contents.
     * @param select Should the pasted nodes be selected.
     */
    paste(select?: boolean): this;
    /**
     * Clears the clipboard.
     */
    clearClipboard(): this;
    /**
     * Copies the current selection.
     */
    copySelection(): this;
    /**
     * Cuts the current selection.
     */
    cutSelection(): this;
    /**
     * Clones the editor state.
     */
    clone(): this;
}
export {};
