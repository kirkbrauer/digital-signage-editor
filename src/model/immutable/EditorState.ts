import { Record, List } from 'immutable';
import { Document } from './Document';
import { Node } from './Node';
import { Sizeable } from './Sizeable';
import uuid from 'uuid/v4';
import { SelectionBox } from './SelectionBox';
import { BoundingBox } from './BoundingBox';
import { Size } from './Size';
import { Vector } from './Vector';
import { EditorState as DraftJsEditorState } from 'draft-js';
import { NodeType } from '../raw';

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

export const defaultEditorState: IEditorState = {
  document: new Document(),
  selectedIDs: List(),
  clipboard: List(),
  selectionBox: null,
  insertOnClick: null,
  insertedId: null,
  pastePosition: null
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
   * Returns the current document.
   */
  public getDocument(): Document {
    return this.document;
  }

  /**
   * Selects a node.
   * @param id The ID of the node to select.
   * @param multiple Should multiple nodes be allowed to be selected.
   */
  public select(id: string, multiple?: boolean): this {
    return this.set('selectedIDs',
      multiple ? this.selectedIDs.push(id) : List.of(id)
    );
  }

  /**
   * Deselects a node.
   * @param id The ID of the node to deselect.
   */
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
    let newNodes = this.clipboard.map((node) => {
      // Give each of the pasted nodes a new ID
      const newID = uuid();
      newIDs.push(newID);
      // Set the node's ID and position
      return node.set('id', newID);
    });
    // Update the positions of all the nodes to match the paste position
    if (this.pastePosition) {
      newNodes = Sizeable.setSizeablePositions(newNodes, this.pastePosition);
    }
    // Add all the nodes to the document
    let state = this.set('document', this.document.addNodes(newNodes));
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
   * Returns a list of currently selected nodes.
   */
  public getSelectedNodes(): List<Node> {
    return this.document.getNodesByID(this.selectedIDs);
  }

  /**
   * Returns the bounding box of a selection.
   */
  public getSelectionBoundingBox(): BoundingBox {
    return Sizeable.calculateBoundingBox(this.getSelectedNodes());
  }

  /**
   * Returns the position of the current selection.
   */
  public getSelectionPosition(): Vector {
    return Sizeable.calculatePosition(this.getSelectedNodes());
  }

  /**
   * Returns the size of the current selection.
   */
  public getSelectionSize(): Size {
    return Sizeable.calculateSize(this.getSelectedNodes());
  }

  /**
   * Returns the currently selected text editor state.
   */
  public getSelectedTextEditorState(): DraftJsEditorState | null {
    // Only return if we have a single text node selected
    if (this.selectedIDs.count() === 1) {
      for (const node of this.getSelectedNodes()) {
        if (node.type === NodeType.TEXT) {
          if (node.editorState) {
            return node.editorState;
          }
        }
      }
    }
    return null;
  }

  /**
   * Sets the selected text editor state.
   */
  public setSelectedTextEditorState(editorState: DraftJsEditorState): this {
    // Only update if we have a single text node selected
    if (this.selectedIDs.count() === 1) {
      for (const node of this.getSelectedNodes()) {
        if (node.type === NodeType.TEXT) {
          if (node.editorState) {
            return this.set('document',
              this.getDocument().updateNode(node.set('editorState', editorState))
            );
          }
        }
      }
    }
    return this;
  }

  /**
   * Clones the editor state.
   */
  public clone(): this {
    return this;
  }

}
