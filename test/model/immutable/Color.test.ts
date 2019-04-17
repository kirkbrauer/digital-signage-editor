import 'mocha';
import { expect } from 'chai';
import { Color, defaultColor } from '../../../src';

describe('Color immutable', () => {
  describe('constructor()', () => {
    it('constructs a new Color with the given properties', () => {
      const RED = 255;
      const GREEN = 0;
      const BLUE = 100;
      const ALPHA = 0.8;
      const color = new Color({
        red: RED,
        green: GREEN,
        blue: BLUE,
        alpha: ALPHA
      });
      expect(color.red).to.equal(RED);
      expect(color.green).to.equal(GREEN);
      expect(color.blue).to.equal(BLUE);
      expect(color.alpha).to.equal(ALPHA);
    });
    it('constructs a default Color when no properties are given', () => {
      const color = new Color();
      expect(color.red).to.equal(defaultColor.red);
      expect(color.green).to.equal(defaultColor.green);
      expect(color.blue).to.equal(defaultColor.blue);
      expect(color.alpha).to.equal(defaultColor.alpha);
    });
  });
  describe('toString()', () => {
    it('returns a valid RGBA string', () => {
      const color = new Color();
      expect(color.toString()).to.equal('rgba(0, 0, 0, 1)');
    });
    it('factors in the opacity when calculating the alpha value', () => {
      const color = new Color();
      expect(color.toString(0.5)).to.equal('rgba(0, 0, 0, 0.5)');
    });
  });
  describe('toRaw()', () => {
    it('returns a RawColor object', () => {
      const color = new Color();
      expect(color.toRaw()).to.deep.equal({
        red: color.red,
        green: color.green,
        blue: color.blue,
        alpha: color.alpha
      });
    });
  });
  describe('static fromRaw()', () => {
    it('instantiates a new Color immutable from a RawColor', () => {
      const RED = 255;
      const GREEN = 0;
      const BLUE = 100;
      const ALPHA = 0.8;
      const color = Color.fromRaw({
        red: RED,
        green: GREEN,
        blue: BLUE,
        alpha: ALPHA
      });
      expect(color.red).to.equal(RED);
      expect(color.green).to.equal(GREEN);
      expect(color.blue).to.equal(BLUE);
      expect(color.alpha).to.equal(ALPHA);
    });
  });
});
