import 'mocha';
import { expect } from 'chai';
import { ColorStop, Color, defaultColorStop } from '../../../src';

describe('ColorStop immutable', () => {
  describe('constructor()', () => {
    it('constructs a new ColorStop with the given properties', () => {
      const POSITION = 0.5;
      const COLOR = new Color();
      const colorStop = new ColorStop({
        position: POSITION,
        color: COLOR
      });
      expect(colorStop.position).to.equal(POSITION);
      expect(colorStop.color).to.equal(COLOR);
    });
    it('constructs a default ColorStop when no properties are given', () => {
      const colorStop = new ColorStop();
      expect(colorStop.position).to.equal(defaultColorStop.position);
      expect(colorStop.color).to.equal(defaultColorStop.color);
    });
  });
  describe('toRaw()', () => {
    it('returns a RawColorStop object', () => {
      const colorStop = new ColorStop();
      expect(colorStop.toRaw()).to.deep.equal({
        position: colorStop.position,
        color: colorStop.color.toRaw()
      });
    });
  });
  describe('static fromRaw()', () => {
    it('instantiates a new ColorStop immutable from a RawColorStop', () => {
      const POSITION = 0.5;
      const COLOR = new Color();
      const colorStop = ColorStop.fromRaw({
        position: POSITION,
        color: COLOR
      });
      expect(colorStop.position).to.equal(POSITION);
      expect(colorStop.color).to.equal(COLOR);
    });
  });
});