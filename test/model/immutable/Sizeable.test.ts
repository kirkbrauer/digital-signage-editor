import 'mocha';
import { expect } from 'chai';
import { Node, Sizeable, Vector, Size, BoundingBox } from '../../../src';
import { List } from 'immutable';

describe('Sizeable abstract class', () => {
  const NODE_0_X = 12;
  const NODE_0_Y = 20;
  const NODE_0_WIDTH = 25;
  const NODE_0_HEIGHT = 15;
  const NODE_0 = new Node({
    position: new Vector({
      x: NODE_0_X,
      y: NODE_0_Y
    }),
    size: new Size({
      width: NODE_0_WIDTH,
      height: NODE_0_HEIGHT
    })
  });
  const NODE_1_X = 10;
  const NODE_1_Y = 5;
  const NODE_1_WIDTH = 100;
  const NODE_1_HEIGHT = 50;
  const NODE_1 = new Node({
    position: new Vector({
      x: NODE_1_X,
      y: NODE_1_Y
    }),
    size: new Size({
      width: NODE_1_WIDTH,
      height: NODE_1_HEIGHT
    })
  });
  const NODE_2_X = 50;
  const NODE_2_Y = 25;
  const NODE_2_WIDTH = 200;
  const NODE_2_HEIGHT = 150;
  const NODE_2 =  new Node({
    position: new Vector({
      x: NODE_2_X,
      y: NODE_2_Y
    }),
    size: new Size({
      width: NODE_2_WIDTH,
      height: NODE_2_HEIGHT
    })
  });
  const NODES = List([
    NODE_0,
    NODE_1,
    NODE_2
  ]);
  describe('static calculatePosition()', () => {
    it('correctly calculates the position of the Nodes', () => {
      const position = Sizeable.calculatePosition(NODES);
      expect(position.x).to.equal(NODE_1_X);
      expect(position.y).to.equal(NODE_1_Y);
    });
    it('returns an empty Vector if the list of Sizeables is empty', () => {
      const position = Sizeable.calculatePosition(List());
      expect(position.x).to.equal(0);
      expect(position.y).to.equal(0);
    });
  });
  describe('static calculateSize()', () => {
    it('correctly calculates the size of the Nodes', () => {
      const size = Sizeable.calculateSize(NODES);
      expect(size.width).to.equal(NODE_2.getBoundingBox().getMaxX() - NODE_1.getBoundingBox().getMinX());
      expect(size.height).to.equal(NODE_2.getBoundingBox().getMaxY() - NODE_1.getBoundingBox().getMinY());
    });
    it('returns an empty Size if the list of Sizeables is empty', () => {
      const size = Sizeable.calculateSize(List());
      expect(size.width).to.equal(0);
      expect(size.height).to.equal(0);
    });
  });
  describe('static calculateBoundingBox()', () => {
    it('returns a BoundingBox', () => {
      const boundingBox = Sizeable.calculateBoundingBox(NODES);
      expect(boundingBox).to.be.instanceOf(BoundingBox);
      expect(boundingBox.getMinX()).to.equal(NODE_1_X);
      expect(boundingBox.getMinY()).to.equal(NODE_1_Y);
      expect(boundingBox.getMaxX()).to.equal(NODE_2.getBoundingBox().getMaxX());
      expect(boundingBox.getMaxY()).to.equal(NODE_2.getBoundingBox().getMaxY());
    });
  });
  describe('static setSizeablePositions()', () => {
    it('updates the position of all child Nodes', () => {
      const ADD_X = 20;
      const ADD_Y = 30;
      const newPosition = new Vector({ x: NODE_1_X + ADD_X, y: NODE_1_Y + ADD_Y });
      const newNodes = Sizeable.setSizeablePositions(NODES, newPosition);
      newNodes.forEach((node, index) => {
        const oldPos = NODES.get(index)!.getPosition();
        const newPos = node.getPosition();
        expect(newPos.x).to.equal(oldPos.x + ADD_X);
        expect(newPos.y).to.equal(oldPos.y + ADD_Y);
      });
    });
  });
  describe('static setSizeableSizes()', () => {
    it('updates the size and position of all child Nodes', () => {
      const MULT_WIDTH = 2.0;
      const MULT_HEIGHT = 1.5;
      const oldSize = Sizeable.calculateSize(NODES);
      const newSize = new Size({ width: oldSize.width * MULT_WIDTH, height: oldSize.height * MULT_HEIGHT });
      const newNodes = Sizeable.setSizeableSizes(NODES, newSize);
      expect(Sizeable.calculateSize(newNodes).toObject()).to.deep.equal(newSize.toObject());
      newNodes.forEach((node, index) => {
        const oldSize = NODES.get(index)!.getSize();
        const newSize = node.getSize();
        expect(newSize.width).to.equal(oldSize.width * MULT_WIDTH);
        expect(newSize.height).to.equal(oldSize.height * MULT_HEIGHT);
      });
    });
  });
});