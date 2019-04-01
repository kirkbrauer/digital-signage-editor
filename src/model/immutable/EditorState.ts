import { Record, List } from 'immutable';
import { Document } from './Document';
import { Node, NodeType } from './Node';
import uuid from 'uuid';

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
   * A node representing the selection group.
   */
  selectionGroup: Node | null;
}

const defaultEditorState: IEditorState = {
  document: new Document(),
  selectedIDs: List(),
  editing: null,
  clipboard: List(),
  selectionGroup: null
};

export class EditorState extends Record<IEditorState>(defaultEditorState) {

  /**
   * Creates an editor state of a document.
   * @param document The document.
   */
  public static of(document: Document): EditorState {
    return new EditorState({ document });
  }

  /**
   * Returns the x position of the current selection.
   */
  public getSelectionX(): number {
    if (this.selectedIDs.count() === 1) {
      return this.document.getNodeByID(this.selectedIDs.get(0))!.getX();
    }
    if (this.selectionGroup) {
      return this.selectionGroup.getX();
    }
    return 0;
  }

  /**
   * Returns the y position of the current selection.
   */
  public getSelectionY(): number {
    if (this.selectedIDs.count() === 1) {
      return this.document.getNodeByID(this.selectedIDs.get(0))!.getY();
    }
    if (this.selectionGroup) {
      return this.selectionGroup.getY();
    }
    return 0;
  }

  /**
   * Returns the width of the current selection.
   */
  public getSelectionWidth(): number {
    if (this.selectedIDs.count() === 1) {
      return this.document.getNodeByID(this.selectedIDs.get(0))!.getWidth();
    }
    if (this.selectionGroup) {
      return this.selectionGroup.getWidth();
    }
    return 0;
  }

  /**
   * Returns the height of the current selection.
   */
  public getSelectionHeight(): number {
    if (this.selectedIDs.count() === 1) {
      return this.document.getNodeByID(this.selectedIDs.get(0))!.getHeight();
    }
    if (this.selectionGroup) {
      return this.selectionGroup.getHeight();
    }
    return 0;
  }

  /**
   * Returns the node that is currently being edited.
   */
  public getEditNode(): Node | null {
    if (this.editing) {
      return this.document.getNodeByID(this.editing);
    }
    return null;
  }

  /**
   * Returns a list of currently selected nodes.
   */
  public getSelectedNodes(): List<Node> {
    return this.document.getNodesByID(this.selectedIDs);
  }

  /**
   * Updates the selction group.
   * The function also syncronizes the document with the selection group.
   * @param node The new selection group.
   */
  public updateSelectionGroup(node: Node): this {
    return this
      .set('selectionGroup', node)
      .set('document',
        this.document.updateNodes(node.nodes!)
      );
  }

  /**
   * Selects a node.
   * @param id The ID of the node to select.
   * @param multiple Should multiple nodes be allowed to be selected.
   */
  public select(id: string, multiple: boolean): this {
    const newState = this.set('selectedIDs',
      multiple ? this.selectedIDs.push(id) : List.of(id)
    );
    if (multiple && newState.selectedIDs.count() > 1) {
      return newState.set('selectionGroup', new Node({
        type: NodeType.GROUP,
        nodes: newState.getSelectedNodes()
      }));
    }
    return newState.set('selectionGroup', null);
  }

  /**
   * Deselects all nodes.
   */
  public deselectAll(): this {
    return this.set('selectedIDs', List()).set('selectionGroup', null);
  }

  /**
   * Selects all nodes in the document.
   */
  public selectAll(): this {
    let newState = this.clone();
    for (const id of this.selectedIDs) {
      newState = this.select(id, true);
    }
    return newState;
  }

  /**
   * Copies nodes by ID.
   * @param ids The IDs of the nodes to copy.
   */
  public copy(ids: List<string>): this {
    return this.set('clipboard',
      this.document.getNodesByID(ids)
    );
  }

  /**
   * Cuts nodes by ID.
   * @param ids The IDs of the nodes to cut.
   */
  public cut(ids: List<string>): this {
    return this.set('clipboard',
      this.document.getNodesByID(ids)
    ).set('document',
      this.document.removeNodesByID(ids)
    );
  }

  /**
   * Pastes the clipboard contents.
   * @param select Should the pasted nodes be selected.
   */
  public paste(select?: boolean): this {
    const newIDs: string[] = [];
    let state = this.set('document',
      this.document.addNodes(this.clipboard.map((node) => {
        // Give each of the pasted nodes a new ID
        const newID = uuid();
        newIDs.push(newID);
        return node.set('id', newID);
      }))
    );
    // Clear all previous selections
    state = state.deselectAll();
    // Select pasted nodes
    if (select) {
      for (const newID of newIDs) {
        state = state.select(newID, true);
      }
    }
    return state;
  }

  /**
   * Clears the clipboard.
   */
  public clearClipboard(): this {
    return this.set('clipboard', List());
  }

  /**
   * Copies the current selection.
   */
  public copySelection(): this {
    return this.copy(this.selectedIDs);
  }

  /**
   * Cuts the current selection.
   */
  public cutSelection(): this {
    return this.cut(this.selectedIDs).set('selectedIDs', List()).set('selectionGroup', null);
  }

  /**
   * Clones the editor state.
   */
  public clone(): this {
    return this;
  }

}
