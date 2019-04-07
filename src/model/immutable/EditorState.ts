import { Record, List } from 'immutable';
import { Document } from './Document';
import { Node } from './Node';
import { Sizeable } from './Sizeable';
import uuid from 'uuid';
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
   * The current clipboard contents.
   */
  clipboard: List<Node>;

  /**
   * The user's selection box.
   */
  selectionBox: SelectionBox | null;

}

const defaultEditorState: IEditorState = {
  document: new Document(),
  selectedIDs: List(),
  clipboard: List(),
  selectionBox: null
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
   * Returns the bounding box of a selection.
   */
  public getSelectionBoundingBox(): BoundingBox {
    return new BoundingBox({
      x: this.getSelectionX(),
      y: this.getSelectionY(),
      width: this.getSelectionWidth(),
      height: this.getSelectionHeight()
    });
  }

  /**
   * Returns the x position of the current selection.
   */
  public getSelectionX(): number {
    return Sizeable.calculateX(this.getSelectedNodes());
  }

  /**
   * Returns the y position of the current selection.
   */
  public getSelectionY(): number {
    return Sizeable.calculateY(this.getSelectedNodes());
  }

  /**
   * Returns the width of the current selection.
   */
  public getSelectionWidth(): number {
    return Sizeable.calculateWidth(this.getSelectedNodes(), this.getSelectionX());
  }

  /**
   * Returns the height of the current selection.
   */
  public getSelectionHeight(): number {
    return Sizeable.calculateHeight(this.getSelectedNodes(), this.getSelectionY());
  }

  /**
   * Returns a list of currently selected nodes.
   */
  public getSelectedNodes(): List<Node> {
    return this.document.getNodesByID(this.selectedIDs);
  }

  /**
   * Selects a node.
   * @param id The ID of the node to select.
   * @param multiple Should multiple nodes be allowed to be selected.
   */
  public select(id: string, multiple: boolean): this {
    return this.set('selectedIDs',
      multiple ? this.selectedIDs.push(id) : List.of(id)
    );
  }

  public deselect(id: string): this {
    return this.set('selectedIDs',
      this.selectedIDs.filterNot(nodeId => nodeId === id)
    );
  }

  /**
   * Deselects all nodes.
   */
  public deselectAll(): this {
    return this.set('selectedIDs', List());
  }

  /**
   * Selects all nodes in the document.
   */
  public selectAll(): this {
    return this.set('selectedIDs', this.document.getNodeIDs());
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
    return this.cut(this.selectedIDs).set('selectedIDs', List());
  }

  /**
   * Clones the editor state.
   */
  public clone(): this {
    return this;
  }

}
