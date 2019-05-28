import { Record, List } from 'immutable';
import { Document } from './Document';
import { Node } from './Node';
import { SelectionBox } from './SelectionBox';
import { BoundingBox } from './BoundingBox';
import { Size } from './Size';
import { Vector } from './Vector';
import { EditorState as DraftJsEditorState } from 'draft-js';
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
     * The current clipboard contents.
     */
    clipboard: List<Node>;
    /**
     * The user's selection box.
     */
    selectionBox?: SelectionBox | null;
    /**
     * The next node to insert on click.
     */
    insertOnClick?: Node | null;
    /**
     * The ID of the last inserted node.
     */
    insertedId?: string | null;
    /**
     * The position to paste the next item.
     */
    pastePosition?: Vector | null;
}
export declare const defaultEditorState: IEditorState;
declare const EditorState_base: Record.Factory<IEditorState>;
export declare class EditorState extends EditorState_base {
    /**
     * Creates an editor state of a document.
     * @param document The document.
     */
    static of(document: Document): EditorState;
    /**
     * Returns the current document.
     */
    getDocument(): Document;
    /**
     * Selects a node.
     * @param id The ID of the node to select.
     * @param multiple Should multiple nodes be allowed to be selected.
     */
    select(id: string, multiple?: boolean): this;
    /**
     * Deselects a node.
     * @param id The ID of the node to deselect.
     */
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
     * Returns a list of currently selected nodes.
     */
    getSelectedNodes(): List<Node>;
    /**
     * Returns the bounding box of a selection.
     */
    getSelectionBoundingBox(): BoundingBox;
    /**
     * Returns the position of the current selection.
     */
    getSelectionPosition(): Vector;
    /**
     * Returns the size of the current selection.
     */
    getSelectionSize(): Size;
    /**
     * Returns the currently selected text editor state.
     */
    getSelectedTextEditorState(): DraftJsEditorState | null;
    /**
     * Sets the selected text editor state.
     */
    setSelectedTextEditorState(editorState: DraftJsEditorState): this;
    /**
     * Clones the editor state.
     */
    clone(): this;
}
export {};
