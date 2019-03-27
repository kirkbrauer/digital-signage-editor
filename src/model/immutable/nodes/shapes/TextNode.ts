import { EditorState } from 'draft-js';
import { ShapeNode, ShapeNodeConfig } from './ShapeNode';

export interface TextNodeConfig extends ShapeNodeConfig {
  editorState?: EditorState;
}

/**
 * A text node.
 */
export class TextNode extends ShapeNode<TextNodeConfig> {

  constructor(config: TextNodeConfig) {
    super(config);
    this.editorState = config.editorState || EditorState.createEmpty();
  }

  /**
   * DraftJS editor state.
   */
  private editorState: EditorState;

  /**
   * Returns the DraftJS editor state.
   */
  public getEditorState(): EditorState {
    return this.editorState;
  }

  /**
   * Sets the DraftJS editor state.
   * @param editorState The new editor state.
   */
  public setEditorState(editorState: EditorState) {
    return this.cloneWith({
      editorState
    });
  }

  public toJS(): TextNodeConfig {
    return {
      ...super.toJS(),
      editorState: this.editorState
    };
  }

  public toRaw() { }

}
