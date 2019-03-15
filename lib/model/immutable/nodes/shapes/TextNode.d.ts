import { EditorState } from 'draft-js';
import { ShapeNode, ShapeNodeConfig } from './ShapeNode';
export interface TextNodeConfig extends ShapeNodeConfig {
    editorState: EditorState;
}
/**
 * A text node.
 */
export declare class TextNode extends ShapeNode<TextNodeConfig> {
    constructor(config: TextNodeConfig);
    /**
     * DraftJS editor state.
     */
    private editorState;
    /**
     * Returns the DraftJS editor state.
     */
    getEditorState(): EditorState;
    /**
     * Sets the DraftJS editor state.
     * @param editorState The new editor state.
     */
    setEditorState(editorState: EditorState): this;
    toJS(): TextNodeConfig;
    toRaw(): void;
}
