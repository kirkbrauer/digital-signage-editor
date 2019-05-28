import 'mocha';
import { expect } from 'chai';
import { Document, Node, defaultDocument } from '../../../src';
import { List } from 'immutable';

describe('Document immutable', () => {
  describe('constructor()', () => {
    it('constructs a new Document with the given properties', () => {
      const WIDTH = 100;
      const HEIGHT = 100;
      const NODES = List();
      const document = new Document({
        width: WIDTH,
        height: HEIGHT,
        nodes: NODES
      });
      expect(document.width).to.equal(WIDTH);
      expect(document.width).to.equal(HEIGHT);
      expect(document.nodes).to.be.an.instanceOf(List);
    });
    it('constructs a default Document when no properties are given', () => {
      const document = new Document();
      expect(document.width).to.equal(defaultDocument.width);
      expect(document.height).to.equal(defaultDocument.height);
      expect(document.nodes).to.equal(defaultDocument.nodes);
    });
  });
  describe('static of()', () => {
    it('instantiates a new Document immutable with the provided nodes', () => {
      const NODES = [
        new Node({ id: '1' }),
        new Node({ id: '2' })
      ];
      const document = Document.of(NODES);
      expect(document.nodes.count()).to.equal(2);
      expect(document.nodes.get(0)!.id).to.equal('1');
      expect(document.nodes.get(1)!.id).to.equal('2');
    });
  });
  describe('toRaw()', () => {
    it('returns a RawDocument object', () => {
      const NODE = new Node({ id: 'test' });
      const document = new Document({
        nodes: List([NODE])
      });
      expect(document.toRaw()).to.deep.equal({
        nodes: [NODE.toRaw()],
        width: document.width,
        height: document.height,
        backgroundColor: null
      });
    });
  });
  describe('static fromRaw()', () => {
    it('instantiates a new Document immutable from a RawDocument', () => {
      const WIDTH = 100;
      const HEIGHT = 100;
      const NODES = [
        new Node().toRaw()
      ];
      const document = Document.fromRaw({
        width: WIDTH,
        height: HEIGHT,
        nodes: NODES
      });
      expect(document.width).to.equal(WIDTH);
      expect(document.width).to.equal(HEIGHT);
      expect(document.nodes).to.be.an.instanceOf(List);
      expect(document.nodes.count()).to.equal(1);
    });
  });
  const NODES = List([
    new Node({ id: '1' }),
    new Node({ id: '2' }),
    new Node({ id: '3' })
  ]);
  let document: Document;
  beforeEach(() => {
    document = new Document({
      nodes: NODES
    });
  });
  describe('getNodeByID()', () => {
    it('returns the correct node', () => {
      const ID = NODES.get(0)!.id;
      expect(document.getNodeByID(ID)!.id).to.equal(ID);
    });
    it('returns null if the node is not found', () => {
      expect(document.getNodeByID('asdf')).to.be.null;
    });
  });
  describe('getNodesByID()', () => {
    it('returns the correct nodes', () => {
      const IDS = List([
        NODES.get(0)!.id,
        NODES.get(2)!.id,
      ]);
      const nodes = document.getNodesByID(IDS);
      expect(nodes.count()).to.equal(2);
      expect(nodes.get(0)!.id).to.equal(NODES.get(0)!.id);
      expect(nodes.get(1)!.id).to.equal(NODES.get(2)!.id);
    });
  });
  describe('getNodeIDs()', () => {
    it('returns the IDs of all the nodes in the document', () => {
      const IDS = NODES.map(node => node.id);
      const ids = document.getNodeIDs();
      expect(ids.count()).to.equal(IDS.count());
      expect(ids.toArray()).to.deep.equal(IDS.toArray());
    });
  });
  describe('updateNode()', () => {
    it('updates the given node', () => {
      const ID = NODES.get(1)!.id;
      const NAME = 'Test';
      const NEW_NODE = new Node({ id: ID, name: NAME });
      expect(document.updateNode(NEW_NODE).getNodeByID(ID)!.name).to.equal(NAME);
    });
  });
  describe('updateNodes()', () => {
    it('updates the given nodes', () => {
      const IDS = [
        NODES.get(0)!.id,
        NODES.get(2)!.id
      ];
      const NAMES = [
        'Test',
        'Hello'
      ];
      const NEW_NODES = List([
        new Node({ id: IDS[0], name: NAMES[0] }),
        new Node({ id: IDS[1], name: NAMES[1] }),
      ]);
      expect(document.updateNodes(NEW_NODES).getNodeByID(IDS[0])!.name).to.equal(NAMES[0]);
      expect(document.updateNodes(NEW_NODES).getNodeByID(IDS[1])!.name).to.equal(NAMES[1]);
    });
  });
  describe('removeNode()', () => {
    it('removes the given node', () => {
      const ID = NODES.get(1)!.id;
      const NODE = new Node({ id: ID });
      const newDocument = document.removeNode(NODE);
      expect(newDocument.nodes.count()).to.equal(NODES.count() - 1);
      expect(newDocument.getNodeByID(ID)).to.be.null;
    });
  });
  describe('removeNodes()', () => {
    it('removes the given nodes', () => {
      const IDS = [
        NODES.get(0)!.id,
        NODES.get(2)!.id
      ];
      const REMOVE_NODES = List([
        new Node({ id: IDS[0] }),
        new Node({ id: IDS[1] }),
      ]);
      const newDocument = document.removeNodes(REMOVE_NODES);
      expect(newDocument.nodes.count()).to.equal(NODES.count() - 2);
      expect(newDocument.getNodeByID(IDS[0])).to.be.null;
      expect(newDocument.getNodeByID(IDS[1])).to.be.null;
    });
  });
  describe('removeNodeByID()', () => {
    it('removes the node by ID', () => {
      const ID = NODES.get(1)!.id;
      const newDocument = document.removeNodeByID(ID);
      expect(newDocument.nodes.count()).to.equal(NODES.count() - 1);
      expect(newDocument.getNodeByID(ID)).to.be.null;
    });
  });
  describe('removeNodesByID()', () => {
    it('removes the nodes by ID', () => {
      const IDS = List([
        NODES.get(0)!.id,
        NODES.get(2)!.id
      ]);
      const newDocument = document.removeNodesByID(IDS);
      expect(newDocument.nodes.count()).to.equal(NODES.count() - 2);
      expect(newDocument.getNodeByID(IDS[0])).to.be.null;
      expect(newDocument.getNodeByID(IDS[1])).to.be.null;
    });
  });
  describe('addNode()', () => {
    it('adds the given node to the beginning of the list', () => {
      const ID = '1234';
      const NODE = new Node({ id: ID });
      const newDocument = document.addNode(NODE);
      expect(newDocument.nodes.count()).to.equal(NODES.count() + 1);
      expect(newDocument.nodes.get(0)!.id).to.equal(ID);
    });
  });
  describe('addNodes()', () => {
    it('adds the given nodes to the beginning of the list', () => {
      const IDS = [
        '1234',
        '5678'
      ];
      const NEW_NODES = List([
        new Node({ id: IDS[0] }),
        new Node({ id: IDS[1] })
      ]);
      const newDocument = document.addNodes(NEW_NODES);
      expect(newDocument.nodes.count()).to.equal(NODES.count() + NEW_NODES.count());
      expect(newDocument.nodes.get(0)!.id).to.equal(IDS[0]);
      expect(newDocument.nodes.get(1)!.id).to.equal(IDS[1]);
    });
  });
  describe('bringToFront()', () => {
    it('brings the nodes with the given IDs to the front', () => {
      const IDS = List([
        NODES.get(1)!.id,
        NODES.get(2)!.id
      ]);
      const newDocument = document.bringToFront(IDS);
      expect(newDocument.nodes.count()).to.equal(NODES.count());
      expect(newDocument.nodes.get(0)!.id).to.equal(IDS.get(0));
      expect(newDocument.nodes.get(1)!.id).to.equal(IDS.get(1));
    });
  });
  describe('sendToBack()', () => {
    it('sends the nodes with the given IDs to the back', () => {
      const IDS = List([
        NODES.get(0)!.id,
        NODES.get(1)!.id
      ]);
      const newDocument = document.sendToBack(IDS);
      expect(newDocument.nodes.count()).to.equal(NODES.count());
      expect(newDocument.nodes.get(1)!.id).to.equal(IDS.get(0));
      expect(newDocument.nodes.get(2)!.id).to.equal(IDS.get(1));
    });
  });
  describe('bringForward()', () => {
    it('sends the nodes with the given IDs forward one', () => {
      const IDS = List([
        NODES.get(1)!.id,
        NODES.get(2)!.id
      ]);
      const newDocument = document.bringForward(IDS);
      expect(newDocument.nodes.count()).to.equal(NODES.count());
      expect(newDocument.nodes.get(0)!.id).to.equal(IDS.get(0));
      expect(newDocument.nodes.get(1)!.id).to.equal(IDS.get(1));
    });
    it('does nothing if the node with the given ID is already at the front', () => {
      const IDS = List([
        NODES.get(0)!.id
      ]);
      const newDocument = document.bringForward(IDS);
      expect(newDocument.nodes.count()).to.equal(NODES.count());
      expect(newDocument.nodes.get(0)!.id).to.equal(IDS.get(0));
    });
  });
  describe('sendBackward()', () => {
    it('sends the nodes with the given IDs back one', () => {
      const IDS = List([
        NODES.get(0)!.id,
        NODES.get(1)!.id
      ]);
      const newDocument = document.sendBackward(IDS);
      expect(newDocument.nodes.count()).to.equal(NODES.count());
      expect(newDocument.nodes.get(1)!.id).to.equal(IDS.get(0));
      expect(newDocument.nodes.get(2)!.id).to.equal(IDS.get(1));
    });
    it('does nothing if the node with the given ID is already at the back', () => {
      const IDS = List([
        NODES.get(NODES.count() - 1)!.id
      ]);
      const newDocument = document.sendBackward(IDS);
      expect(newDocument.nodes.count()).to.equal(NODES.count());
      expect(newDocument.nodes.get(newDocument.nodes.count() - 1)!.id).to.equal(IDS.get(0));
    });
  });
  describe('clone()', () => {
    it('returns a copy of the Document', () => {
      const cloned = document.clone();
      expect(cloned.width).to.equal(document.width);
      expect(cloned.height).to.equal(document.height);
      expect(cloned.nodes).to.deep.equal(document.nodes);
    });
  });
});
