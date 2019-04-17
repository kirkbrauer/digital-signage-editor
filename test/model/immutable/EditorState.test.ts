import 'mocha';
import { expect } from 'chai';
import { EditorState, Document, Node, SelectionBox, Vector, Size, defaultEditorState } from '../../../src';
import { List } from 'immutable';

describe('EditorState immutable', () => {
  describe('constructor()', () => {
    it('constructs a new EditorState with the given properties', () => {
      const DOCUMENT = new Document();
      const SELECTED_IDS = List(['test']);
      const CLIPBOARD = List([new Node({ id: 'test' })]);
      const SELECTION_BOX = new SelectionBox({
        cursorPos: new Vector({
          x: 1,
          y: 5
        })
      })
      const editorState = new EditorState({
        document: DOCUMENT,
        selectedIDs: SELECTED_IDS,
        clipboard: CLIPBOARD,
        selectionBox: SELECTION_BOX
      });
      expect(editorState.document).to.equal(DOCUMENT);
      expect(editorState.selectedIDs).to.deep.equal(SELECTED_IDS);
      expect(editorState.clipboard).to.deep.equal(CLIPBOARD);
      expect(editorState.selectionBox).to.deep.equal(SELECTION_BOX);
    });
    it('constructs a default EditorState when no properties are given', () => {
      const editorState = new EditorState();
      expect(editorState.document).to.equal(defaultEditorState.document);
      expect(editorState.selectedIDs).to.equal(defaultEditorState.selectedIDs);
      expect(editorState.clipboard).to.equal(defaultEditorState.clipboard);
      expect(editorState.selectionBox).to.equal(defaultEditorState.selectionBox);
    });
  });
  describe('static of()', () => {
    it('instantiates a new EditorState immutable with the provided document', () => {
      const DOCUMENT = new Document({
        width: 200,
        height: 200
      });
      const editorState = EditorState.of(DOCUMENT);
      expect(editorState.document).to.deep.equal(DOCUMENT);
    });
  });
  const WIDTH = 100;
  const HEIGHT = 100;
  const NODES = List([
    new Node({ id: '1', name: 'test1', size: new Size({ width: WIDTH, height: HEIGHT }) }),
    new Node({ id: '2', name: 'test2' }),
    new Node({ id: '3', name: 'test3' })
  ]);
  const DOCUMENT = Document.of(NODES);
  let editorState: EditorState;
  beforeEach(() => {
    editorState = new EditorState({
      document: DOCUMENT
    });
  });
  describe('getDocument()', () => {
    it('returns the current document', () => {
      expect(editorState.getDocument()).to.deep.equal(DOCUMENT);
    });
  });
  describe('select()', () => {
    it('selects the node with the given IDs', () => {
      const ID = NODES.get(0)!.id;
      const newEditorState = editorState.select(ID);
      expect(newEditorState.selectedIDs.count()).to.equal(1);
      expect(newEditorState.selectedIDs.get(0)).to.equal(ID);
    });
    it('allows multiple nodes to be selected when multiple is true', () => {
      const ID_1 = NODES.get(0)!.id;
      const ID_2 = NODES.get(1)!.id;
      let newEditorState = editorState.select(ID_1, true);
      newEditorState = newEditorState.select(ID_2, true);
      expect(newEditorState.selectedIDs.count()).to.equal(2);
      expect(newEditorState.selectedIDs.get(0)).to.equal(ID_1);
      expect(newEditorState.selectedIDs.get(1)).to.equal(ID_2);
    });
  });
  describe('deselect()', () => {
    let newEditorState: EditorState;
    const ID_1 = NODES.get(0)!.id;
    const ID_2 = NODES.get(1)!.id;
    before(() => {
      newEditorState = editorState.select(ID_1, true);
      newEditorState = newEditorState.select(ID_2, true);
    });
    it('deselects the node with the provided ID', () => {
      newEditorState = newEditorState.deselect(ID_2);
      expect(newEditorState.selectedIDs.count()).to.equal(1);
      expect(newEditorState.selectedIDs.get(0)!).to.equal(ID_1);
    });
  });
  describe('deselectAll()', () => {
    let newEditorState: EditorState;
    const ID_1 = NODES.get(0)!.id;
    const ID_2 = NODES.get(1)!.id;
    before(() => {
      newEditorState = editorState.select(ID_1, true);
      newEditorState = newEditorState.select(ID_2, true);
    });
    it('deselects all nodes', () => {
      newEditorState = newEditorState.deselectAll();
      expect(newEditorState.selectedIDs.count()).to.equal(0);
    });
  });
  describe('selectAll()', () => {
    it('should select all nodes in the document', () => {
      const newEditorState = editorState.selectAll();
      expect(newEditorState.selectedIDs.count()).to.equal(NODES.count());
      for (const NODE of NODES) {
        expect(newEditorState.selectedIDs.toArray()).to.include(NODE.id);
      }
    });
  });
  describe('copy()', () => {
    it('copies the nodes with the given IDs to the clipboard', () => {
      const IDS = List([
        NODES.get(0)!.id,
        NODES.get(1)!.id,
      ]);
      const newEditorState = editorState.copy(IDS);
      expect(newEditorState.clipboard.count()).to.equal(IDS.count());
    });
  });
  describe('cut()', () => {
    it('copies the nodes with the given IDs to the clipboard and removes them from the document', () => {
      const IDS = List([
        NODES.get(0)!.id,
        NODES.get(1)!.id,
      ]);
      const newEditorState = editorState.cut(IDS);
      expect(newEditorState.clipboard.count()).to.equal(IDS.count());
      expect(newEditorState.document.nodes.count()).to.equal(NODES.count() - IDS.count());
      for (const ID of IDS) {
        expect(newEditorState.document.getNodeByID(ID)).to.be.null;
      }
    });
  });
  describe('paste()', () => {
    let newEditorState: EditorState;
    const IDS = List([
      NODES.get(0)!.id,
      NODES.get(1)!.id,
    ]);
    beforeEach(() => {
      newEditorState = editorState.copy(IDS);
    });
    it('pastes the copied items to the clipboard', () => {
      newEditorState = newEditorState.paste();
      expect(newEditorState.document.nodes.count()).to.equal(NODES.count() + IDS.count());
    });
    it('pastes the copied items to the clipboard and selects them when select is true', () => {
      newEditorState = newEditorState.paste(true);
      expect(newEditorState.selectedIDs.count()).to.equal(IDS.count());
    });
  });
  describe('clearClipboard()', () => {
    let newEditorState: EditorState;
    const IDS = List([
      NODES.get(0)!.id,
      NODES.get(1)!.id,
    ]);
    before(() => {
      newEditorState = editorState.copy(IDS);
    });
    it('clears the clipboard', () => {
      expect(newEditorState.clearClipboard().clipboard.count()).to.equal(0);
    });
  });
  describe('copySelection()', () => {
    it('copies the selected nodes', () => {
      const newEditorState = editorState.selectAll().copySelection();
      expect(newEditorState.clipboard.count()).to.equal(NODES.count());
    });
  });
  describe('cutSelection()', () => {
    it('copies the selected nodes and removes them from the document', () => {
      const newEditorState = editorState.selectAll().cutSelection();
      expect(newEditorState.clipboard.count()).to.equal(NODES.count());
      expect(newEditorState.document.nodes.count()).to.equal(0);
    });
  });
  describe('getSelectedNodes()', () => {
    it('returns the currently selected nodes', () => {
      const newEditorState = editorState.selectAll();
      expect(newEditorState.getSelectedNodes().count()).to.equal(NODES.count());
    });
  });
  describe('getSelectionBoundingBox()', () => {
    it('returns a BoundingBox that contains all the selected nodes', () => {
      const newEditorState = editorState.selectAll();
      const boundingBox = newEditorState.getSelectionBoundingBox();
      expect(boundingBox.getMinX()).to.equal(0);
      expect(boundingBox.getMinY()).to.equal(0);
      expect(boundingBox.getMaxX()).to.equal(WIDTH);
      expect(boundingBox.getMaxY()).to.equal(HEIGHT);
    });
  });
  describe('getSelectionPosition()', () => {
    it('returns the position Vector of the selection', () => {
      const newEditorState = editorState.selectAll();
      const position = newEditorState.getSelectionPosition();
      expect(position.x).to.equal(0);
      expect(position.y).to.equal(0);
    });
  });
  describe('getSelectionSize()', () => {
    it('returns the size of the selection', () => {
      const newEditorState = editorState.selectAll();
      const size = newEditorState.getSelectionSize();
      expect(size.width).to.equal(WIDTH);
      expect(size.height).to.equal(HEIGHT);
    });
  });
  describe('clone()', () => {
    it('returns a copy of the EditorState', () => {
      const cloned = editorState.clone();
      expect(cloned.document).to.deep.equal(editorState.document);
      expect(cloned.selectedIDs).to.deep.equal(editorState.selectedIDs);
      expect(cloned.clipboard).to.deep.equal(editorState.clipboard);
      expect(cloned.selectionBox).to.deep.equal(editorState.selectionBox);
    });
  });
});