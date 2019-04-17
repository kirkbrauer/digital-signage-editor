import 'mocha';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { SelectionBox, Vector, BoundingBox, Node, defaultSelectionBox } from '../../../src';

describe('SelectionBox immutable', () => {
  describe('constructor()', () => {
    it('constructs a new SelectionBox with the given properties', () => {
      const startPos = new Vector();
      const cursorPos = new Vector({ x: 10, y: 10 });
      const selectionBox = new SelectionBox({
        startPos,
        cursorPos
      });
      expect(selectionBox.startPos).to.equal(startPos);
      expect(selectionBox.cursorPos).to.equal(cursorPos);
    });
    it('constructs a default SelectionBox when no properties are given', () => {
      const selectionBox = new SelectionBox();
      expect(selectionBox.startPos).to.equal(defaultSelectionBox.startPos);
      expect(selectionBox.cursorPos).to.equal(defaultSelectionBox.cursorPos);
    });
  });
  let selectionBox: SelectionBox;
  const START_POS = new Vector({ x: 5, y: 5 });
  const CURSOR_POS = new Vector({ x: 10, y: 10 });
  beforeEach(() => {
    selectionBox = new SelectionBox({
      startPos: START_POS,
      cursorPos: CURSOR_POS
    });
  });
  describe('getBoundingBox()', () => {
    it('returns a BoundingBox for the SelectionBox', () => {
      const boundingBox = selectionBox.getBoundingBox();
      expect(boundingBox).to.be.an.instanceOf(BoundingBox);
      expect(boundingBox.getMinX()).to.equal(START_POS.x);
      expect(boundingBox.getMinY()).to.equal(START_POS.y);
      expect(boundingBox.getMaxX()).to.equal(CURSOR_POS.x);
      expect(boundingBox.getMaxY()).to.equal(CURSOR_POS.y);
    });
  });
  describe('getPosition()', () => {
    it('returns the position of the SelectionBox when the cursor is to the left of the start position', () => {
      const NEW_CURSOR_POS = new Vector({ x: 0, y: 0 });
      const newSelectionBox = selectionBox.set('cursorPos', NEW_CURSOR_POS);
      expect(newSelectionBox.getPosition().toObject()).to.deep.equal(NEW_CURSOR_POS.toObject());
    });
    it('returns the position of the SelectionBox when the cursor is to the right of the start position', () => {
      expect(selectionBox.getPosition().toObject()).to.deep.equal(START_POS.toObject());
    });
  });
  describe('getSize()', () => {
    it('returns the size of the SelectionBox when the cursor is to the left of the start position', () => {
      const NEW_CURSOR_POS = new Vector({ x: 0, y: 0 });
      const newSelectionBox = selectionBox.set('cursorPos', NEW_CURSOR_POS);
      expect(newSelectionBox.getSize().toObject()).to.deep.equal({
        width: START_POS.x,
        height: START_POS.y
      });
    });
    it('returns the size of the SelectionBox when the cursor is to the right of the start position', () => {
      expect(selectionBox.getSize().toObject()).to.deep.equal({
        width: CURSOR_POS.x - START_POS.x,
        height: CURSOR_POS.y - START_POS.y
      });
    });
  });
  describe('includes()', () => {
    const sandbox = sinon.createSandbox();
    before(() => {
      sandbox.spy(SelectionBox.prototype, 'getBoundingBox');
      sandbox.spy(BoundingBox.prototype, 'includes');
    });
    after(() => {
      sandbox.restore();
    });
    it('calls getBoundingBox() and calls the BoundingBox\'s includes() method', () => {
      const NODE = new Node();
      selectionBox.includes(NODE);
      expect(SelectionBox.prototype.getBoundingBox).to.have.been.calledOnce;
    });
  });
});
