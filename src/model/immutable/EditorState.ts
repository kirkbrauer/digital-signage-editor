import { Document } from './Document';
import { Node, GroupNode } from './nodes';
import shortid from 'shortid';
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
export class EditorState extends Immutable<EditorStateConfig, any> {

  /**
   * Current document.
   */
  private document: Document;

  /**
   * The IDs of currently selected objects.
   */
  private selected: string[];

  /**
   * The ID of the node that is being edited.
   */
  private editing: string | null;

  /**
   * The current selection group.
   */
  private selectionGroup: GroupNode | null;

  /**
   * Static method to create an empty editor state.
   */
  public static createEmpty(): EditorState {
    return new EditorState({});
  }

  /**
   * Static method to create an editor state with a document.
   * @param document The document for the editor state.
   */
  public static createWithDocument(document: Document): EditorState {
    return new EditorState({ document });
  }

  constructor(config: EditorStateConfig) {
    super();
    this.document = config.document || Document.createEmpty();
    this.selected = config.selected || [];
    this.editing = config.editing || null;
    this.selectionGroup = config.selectionGroup || null;
  }

  /**
   * Returns the currently selected nodes.
   */
  public getSelectedNodes(): Node[] {
    return this.document.getNodes(this.selected);
  }

  /**
   * Deselects all currently selected nodes.
   */
  public deselectAll(): EditorState {
    let newDocument = this.getDocument();
    if (this.selectionGroup) {
      // Update the nodes to match the versions in the selection group
      for (const node of this.selectionGroup.getNodes()) {
        newDocument = newDocument.updateNode(node);
      }
    }
    return this.cloneWith({
      document: newDocument,
      selected: [],
      editing: null,
      selectionGroup: null
    });
  }

  /**
   * Returns the height of the current selection.
   */
  public getSelectionHeight(): number {
    if (this.selectionGroup) {
      return this.selectionGroup.getHeight();
    }
    if (this.selected.length === 1) {
      return this.getSelectedNodes()[0].getHeight();
    }
    return 0;
  }

  /**
   * Returns the width of the current selection.
   */
  public getSelectionWidth(): number {
    if (this.selectionGroup) {
      return this.selectionGroup.getWidth();
    }
    if (this.selected.length === 1) {
      return this.getSelectedNodes()[0].getWidth();
    }
    return 0;
  }

  /**
   * Returns the position of the current selection.
   */
  public getSelectionPosition(): Vector {
    if (this.selectionGroup) {
      return this.selectionGroup.getPosition();
    }
    if (this.selected.length === 1) {
      return this.getSelectedNodes()[0].getPosition();
    }
    return { x: 0, y: 0 };
  }

  /**
   * Returns the x position of the current selection.
   */
  public getSelectionXPos(): number {
    return this.getSelectionPosition().x;
  }

   /**
     * Returns the y position of the current selection.
     */
  public getSelectionYPos(): number {
    return this.getSelectionPosition().y;
  }

  /**
   * Returns the current document.
   */
  public getDocument(): Document {
    return this.document;
  }

  /**
   * Sets the current document.
   * @param document The new document.
   */
  public setDocument(document: Document): EditorState {
    return this.cloneWith({
      document
    });
  }

  /**
   * Returns the selection group.
    */
  public getSelectionGroup(): GroupNode | null {
    return this.selectionGroup;
  }

  /**
   * Sets the selection group.
   * @param group The new selection group.
   */
  public setSelectionGroup(group: GroupNode): EditorState {
    return this.cloneWith({
      selectionGroup: group
    });
  }

  /**
   * Syncronizes the document with the selection group.
   */
  public sync(): EditorState {
    let newDocument: Document;
    // Syncronize each node in the document
    for (const node of this.selectionGroup!.getNodes()) {
      newDocument = this.document.updateNode(node);
    }
    return this.setDocument(newDocument!);
  }

  /**
   * Updates the selection group and syncronizes the document with it.
   * @param group The updated selection group.
   */
  public updateSelectionGroup(group: GroupNode): EditorState {
    const newState = this.setSelectionGroup(group);
    return newState.sync();
  }

  /**
   * Returns the IDs of the currently selected nodes.
   */
  public getSelectedIds(): string[] {
    return this.selected;
  }

  /**
   * Selectes a node.
   * @param id The ID of the node to select.
   * @param multiple 
   */
  public select(id: string, multiple?: boolean): EditorState {
    // The new selected node IDs
    const newSelected = multiple ? [...this.selected, id] : [id];
    // Get the nodes to put in the selection group
    const newSelectedNodes = this.document.getNodes(newSelected);
    return this.cloneWith({
      selected: newSelected,
      selectionGroup: multiple ? new GroupNode({
        id: shortid.generate(),
        visible: true,
        opacity: 1.0,
        nodes: newSelectedNodes
      }) : null
    });
  }

  /**
   * Starts editing a node.
   * @param id The ID of the node to edit.
   */
  public edit(id: string) {
    return this.cloneWith({
      editing: id
    });
  }

  /**
   * Returns the ID of the node currently being edited.
   */
  public getEditId(): string | null {
    return this.editing;
  }

  /**
   * Returns the node currently being edited.
   */
  public getEditNode(): Node | null {
    return this.getDocument().getNode(this.editing || '');
  }

  /**
   * Stops editing a node.
   */
  public stopEditing() {
    return this.cloneWith({
      editing: null
    });
  }

  public toJS(): EditorStateConfig {
    return {
      document: this.document,
      selected: this.selected,
      editing: this.editing,
      selectionGroup: this.selectionGroup
    };
  }

  public toRaw() { }

}
