import { Document } from './Document';
import { Node, GroupNode } from './nodes';
import { Immutable } from './Immutable';
interface EditorStateConfig {
    document?: Document;
    selected?: string[];
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
     * The current selection group.
     */
    private selectionGroup;
    static createEmpty(): EditorState;
    static createWithDocument(document: Document): EditorState;
    constructor(config: EditorStateConfig);
    getSelectedNodes(): Node[];
    deselectAll(): EditorState;
    getDocument(): Document;
    setDocument(document: Document): EditorState;
    getSelectionGroup(): GroupNode | null;
    setSelectionGroup(group: GroupNode): EditorState;
    getSelectedIds(): string[];
    select(id: string, multiple?: boolean): EditorState;
    toJS(): EditorStateConfig;
    toRaw(): void;
}
export {};
