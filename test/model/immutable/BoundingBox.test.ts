import 'mocha';
import { expect } from 'chai';
import { BoundingBox, Vector, Size } from '../../../src';

describe('BoundingBox immutable', () => {
  describe('constructor()', () => {
    it('constructs a new BoundingBox with the given properties', () => {
      const position = new Vector();
      const size = new Size();
      const boundingBox = new BoundingBox({
        position,
        size
      });
      expect(boundingBox.position).to.equal(position);
      expect(boundingBox.size).to.equal(size);
    });
    it('constructs a default BoundingBox when no properties are given', () => {
      const boundingBox = new BoundingBox();
      expect(boundingBox.position).to.be.an.instanceOf(Vector);
      expect(boundingBox.size).to.be.an.instanceOf(Size);
    });
  });
  let boundingBox: BoundingBox;
  const X_POS = 10;
  const Y_POS = 10;
  const WIDTH = 100;
  const HEIGHT = 100;
  beforeEach(() => {
    // Instantiate a new BoundingBox
    boundingBox = new BoundingBox({
      position: new Vector({ x: X_POS, y: Y_POS }),
      size: new Size({ width: WIDTH, height: HEIGHT })
    });
  });
  describe('getMinX()', () => {
    it('returns the x position of the BoundingBox', () => {
      expect(boundingBox.getMinX()).to.equal(X_POS);
    });
  });
  describe('getMinY()', () => {
    it('returns the y position of the BoundingBox', () => {
      expect(boundingBox.getMinY()).to.equal(Y_POS);
    });
  });
  describe('getMaxX()', () => {
    it('returns the width + x position of the BoundingBox', () => {
      expect(boundingBox.getMaxX()).to.equal(X_POS + WIDTH);
    });
  });
  describe('getMaxY()', () => {
    it('returns the height + y position of the BoundingBox', () => {
      expect(boundingBox.getMaxY()).to.equal(Y_POS + HEIGHT);
    });
  });
  describe('includes()', () => {
    const INSIDE_X_POS = 20;
    const INSIDE_Y_POS = 20;
    const INSIDE_WIDTH = 100;
    const INSIDE_HEIGHT = 100;
    let inside: BoundingBox;
    const OUTSIDE_X_POS = 200;
    const OUTSIDE_Y_POS = 200;
    const OUTSIDE_WIDTH = 100;
    const OUTSIDE_HEIGHT = 100;
    let outside: BoundingBox;
    before(() => {
      inside = new BoundingBox({
        position: new Vector({ x: INSIDE_X_POS, y: INSIDE_Y_POS }),
        size: new Size({ width: INSIDE_WIDTH, height: INSIDE_HEIGHT })
      });
      outside = new BoundingBox({
        position: new Vector({ x: OUTSIDE_X_POS, y: OUTSIDE_Y_POS }),
        size: new Size({ width: OUTSIDE_WIDTH, height: OUTSIDE_HEIGHT })
      });
    });
    it('returns true if the other BoundingBox is inside the BoundingBox', () => {
      expect(boundingBox.includes(inside)).to.be.true;
    });
    it('returns false if the other BoundingBox is outside the BoundingBox', () => {
      expect(boundingBox.includes(outside)).to.be.false;
    });
  });
});
