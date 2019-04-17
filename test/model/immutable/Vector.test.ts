import 'mocha';
import { expect } from 'chai';
import { Vector, defaultVector } from '../../../src';

describe('Vector immutable', () => {
  describe('constructor()', () => {
    it('constructs a new Vector with the given properties', () => {
      const X = 10;
      const Y = 20;
      const vector = new Vector({
        x: X,
        y: Y
      });
      expect(vector.x).to.equal(X);
      expect(vector.y).to.equal(Y);
    });
    it('constructs a default Vector when no properties are given', () => {
      const vector = new Vector();
      expect(vector.x).to.equal(defaultVector.x);
      expect(vector.y).to.equal(defaultVector.y);
    });
  });
  describe('toRaw()', () => {
    it('returns a RawVector object', () => {
      const vector = new Vector();
      expect(vector.toRaw()).to.deep.equal({
        x: vector.x,
        y: vector.y
      });
    });
  });
  describe('static fromRaw()', () => {
    it('instantiates a new Vector immutable from a RawVector', () => {
      const X = 10;
      const Y = 20;
      const vector = Vector.fromRaw({
        x: X,
        y: Y
      });
      expect(vector.x).to.equal(X);
      expect(vector.y).to.equal(Y);
    });
  });
});
