import { Document } from './Document';
import { Node, GroupNode } from './nodes';
import { Immutable } from './Immutable';
import { Vector } from './Vector';
interface EditorStateConfig {
    document?: Document;
    selected?: string[];
    editing?: string | null;
    selectionGroup?: GroupNode | null;
}
/**
 * Editor state object.
 */
export declare class EditorState extends Immutable<EditorStateConfig, any> {
    /**
     * Current document.
     */
    private document;
    /**
     * The IDs of currently selected objects.
     */
    private selected;
    /**
     * The ID of the node that is being edited.
     */
    private editing;
    /**
     * The current selection group.
     */
    private selectionGroup;
    /**
     * Static method to create an empty editor state.
     */
    static createEmpty(): EditorState;
    /**
     * Static method to create an editor state with a document.
     * @param document The document for the editor state.
     */
    static createWithDocument(document: Document): EditorState;
    constructor(config: EditorStateConfig);
    /**
     * Returns the currently selected nodes.
     */
    getSelectedNodes(): Node[];
    /**
     * Deselects all currently selected nodes.
     */
    deselectAll(): EditorState;
    /**
     * Returns the height of the current selection.
     */
    getSelectionHeight(): number;
    /**
     * Returns the width of the current selection.
     */
    getSelectionWidth(): number;
    /**
     * Returns the position of the current selection.
     */
    getSelectionPosition(): Vector;
    /**
     * Returns the x position of the current selection.
     */
    getSelectionXPos(): number;
    /**
      * Returns the y position of the current selection.
      */
    getSelectionYPos(): number;
    /**
     * Returns the current document.
     */
    getDocument(): Document;
    /**
     * Sets the current document.
     * @param document The new document.
     */
    setDocument(document: Document): EditorState;
    /**
     * Returns the selection group.
      */
    getSelectionGroup(): GroupNode | null;
    /**
     * Sets the selection group.
     * @param group The new selection group.
     */
    setSelectionGroup(group: GroupNode): EditorState;
    /**
     * Syncronizes the document with the selection group.
     */
    sync(): EditorState;
    /**
     * Updates the selection group and syncronizes the document with it.
     * @param group The updated selection group.
     */
    updateSelectionGroup(group: GroupNode): EditorState;
    /**
     * Returns the IDs of the currently selected nodes.
     */
    getSelectedIds(): string[];
    /**
     * Selectes a node.
     * @param id The ID of the node to select.
     * @param multiple
     */
    select(id: string, multiple?: boolean): EditorState;
    /**
     * Starts editing a node.
     * @param id The ID of the node to edit.
     */
    edit(id: string): this;
    /**
     * Returns the ID of the node currently being edited.
     */
    getEditId(): string | null;
    /**
     * Returns the node currently being edited.
     */
    getEditNode(): Node | null;
    /**
     * Stops editing a node.
     */
    stopEditing(): this;
    toJS(): EditorStateConfig;
    toRaw(): void;
}
export {};
