import { Document } from './Document';
import { Node, GroupNode } from './nodes';
import shortid from 'shortid';
import { Immutable } from './Immutable';

interface EditorStateConfig {
  document?: Document;
  selected?: string[];
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
   * The current selection group.
   */
  private selectionGroup: GroupNode | null;

  public static createEmpty(): EditorState {
    return new EditorState({});
  }

  public static createWithDocument(document: Document): EditorState {
    return new EditorState({ document });
  }

  constructor(config: EditorStateConfig) {
    super();
    this.document = config.document || Document.createEmpty();
    this.selected = config.selected || [];
    this.selectionGroup = config.selectionGroup || null;
  }

  public getSelectedNodes(): Node[] {
    return this.document.getNodes(this.selected);
  }

  public deselectAll(): EditorState {
    let newDocument = this.getDocument();
    if (this.selectionGroup) {
      // Update the nodes to match the versions in the selection group
      for (const node of this.selectionGroup.getNodes()) {
        newDocument = newDocument.updateNode(node);
      }
    }
    return new EditorState({
      document: newDocument,
      selected: [],
      selectionGroup: null
    });
  }

  public getDocument(): Document {
    return this.document;
  }

  public setDocument(document: Document): EditorState {
    return new EditorState({
      ...this.toJS(),
      document
    });
  }

  public getSelectionGroup(): GroupNode | null {
    return this.selectionGroup;
  }

  public setSelectionGroup(group: GroupNode): EditorState {
    return new EditorState({
      ...this.toJS(),
      selectionGroup: group
    });
  }

  public getSelectedIds(): string[] {
    return this.selected;
  }

  public select(id: string, multiple?: boolean): EditorState {
    const newSelected = multiple ? [...this.selected, id] : [id];
    const newSelectedNodes = this.document.getNodes(newSelected);
    return new EditorState({
      document: this.getDocument(),
      selected: newSelected,
      selectionGroup: multiple ? new GroupNode({
        id: shortid.generate(),
        visible: true,
        opacity: 1.0,
        nodes: newSelectedNodes
      }) : null
    });
  }

  public toJS(): EditorStateConfig {
    return {
      document: this.document,
      selected: this.selected,
      selectionGroup: this.selectionGroup
    };
  }

  public toRaw() { }

}
