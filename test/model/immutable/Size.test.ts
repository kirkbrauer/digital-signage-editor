import 'mocha';
import { expect } from 'chai';
import { Size, defaultSize } from '../../../src';

describe('Size immutable', () => {
  describe('constructor()', () => {
    it('constructs a new Size with the given properties', () => {
      const WIDTH = 100;
      const HEIGHT = 200;
      const size = new Size({
        width: WIDTH,
        height: HEIGHT
      });
      expect(size.width).to.equal(WIDTH);
      expect(size.height).to.equal(HEIGHT);
    });
    it('constructs a default Size when no properties are given', () => {
      const size = new Size();
      expect(size.width).to.equal(defaultSize.width);
      expect(size.height).to.equal(defaultSize.height);
    });
  });
  describe('toRaw()', () => {
    it('returns a RawSize object', () => {
      const size = new Size();
      expect(size.toRaw()).to.deep.equal({
        width: size.width,
        height: size.height
      });
    });
  });
  describe('static fromRaw()', () => {
    it('instantiates a new Size immutable from a RawSize', () => {
      const WIDTH = 100;
      const HEIGHT = 200;
      const size = Size.fromRaw({
        width: WIDTH,
        height: HEIGHT
      });
      expect(size.width).to.equal(WIDTH);
      expect(size.height).to.equal(HEIGHT);
    });
  });
});
