import 'mocha';
import { expect } from 'chai';
import { Fill, Color, GradientType, ColorStop, ImageScaleMode, defaultFill, ImageRepeatMode, StrokeAlign } from '../../../src';
import { List } from 'immutable';

describe('Fill immutable', () => {
  const VISIBLE = true;
  const OPACITY = 0.8;
  const COLOR = new Color({ red: 255, green: 0, blue: 0, alpha: 1 });
  const GRADIENT_TYPE = GradientType.LINEAR;
  const GRADIENT_ANGLE = 25;
  const GRADIENT_STOPS = List([
    new ColorStop({
      color: new Color({ red: 0, green: 255, blue: 0, alpha: 1 }),
      position: 0
    }),
    new ColorStop({
      color: new Color({ red: 0, green: 0, blue: 255, alpha: 0.5 }),
      position: 1
    })
  ]);
  const SCALE_MODE = ImageScaleMode.FILL;
  const REPEAT_MODE = ImageRepeatMode.REPEAT;
  const IMAGE_URL = 'test.url';
  describe('constructor()', () => {
    it('constructs a new Fill with the given properties', () => {
      const fill = new Fill({
        visible: VISIBLE,
        opacity: OPACITY,
        color: COLOR,
        gradientType: GRADIENT_TYPE,
        gradientAngle: GRADIENT_ANGLE,
        gradientStops: GRADIENT_STOPS,
        scaleMode: SCALE_MODE,
        repeatMode: REPEAT_MODE,
        imageUrl: IMAGE_URL
      });
      expect(fill.visible).to.equal(VISIBLE);
      expect(fill.opacity).to.equal(OPACITY);
      expect(fill.color).to.equal(COLOR);
      expect(fill.gradientType).to.equal(GRADIENT_TYPE);
      expect(fill.gradientAngle).to.equal(GRADIENT_ANGLE);
      expect(fill.gradientStops).to.equal(GRADIENT_STOPS);
      expect(fill.scaleMode).to.equal(SCALE_MODE);
      expect(fill.repeatMode).to.equal(REPEAT_MODE);
      expect(fill.imageUrl).to.equal(IMAGE_URL);
    });
    it('constructs a default Fill when no properties are given', () => {
      const fill = new Fill();
      expect(fill.visible).to.equal(defaultFill.visible);
      expect(fill.opacity).to.equal(defaultFill.opacity);
      expect(fill.color).to.equal(defaultFill.color);
      expect(fill.gradientType).to.equal(defaultFill.gradientType);
      expect(fill.gradientAngle).to.equal(defaultFill.gradientAngle);
      expect(fill.gradientStops).to.equal(defaultFill.gradientStops);
      expect(fill.scaleMode).to.equal(defaultFill.scaleMode);
      expect(fill.repeatMode).to.equal(defaultFill.repeatMode);
      expect(fill.imageUrl).to.equal(defaultFill.imageUrl);
    });
  });
  describe('toRaw()', () => {
    it('returns a RawFill object', () => {
      const fill = new Fill({
        visible: VISIBLE,
        opacity: OPACITY,
        color: COLOR,
        gradientType: GRADIENT_TYPE,
        gradientAngle: GRADIENT_ANGLE,
        gradientStops: GRADIENT_STOPS,
        scaleMode: SCALE_MODE,
        repeatMode: REPEAT_MODE,
        imageUrl: IMAGE_URL
      });
      expect(fill.toRaw()).to.deep.equal({
        visible: fill.visible,
        opacity: fill.opacity,
        color: fill.color.toRaw(),
        gradientType: fill.gradientType,
        gradientAngle: fill.gradientAngle,
        gradientStops: fill.gradientStops ? fill.gradientStops.map(gradientStop => gradientStop.toRaw()).toArray() : null,
        scaleMode: fill.scaleMode,
        repeatMode: fill.repeatMode,
        imageUrl: fill.imageUrl
      });
    });
  });
  describe('static fromRaw()', () => {
    it('instantiates a new Fill immutable from a RawFill', () => {
      const fill = Fill.fromRaw({
        visible: VISIBLE,
        opacity: OPACITY,
        color: COLOR,
        gradientType: GRADIENT_TYPE,
        gradientAngle: GRADIENT_ANGLE,
        gradientStops: [
          GRADIENT_STOPS.get(0)!.toRaw(),
          GRADIENT_STOPS.get(1)!.toRaw()
        ],
        scaleMode: SCALE_MODE,
        repeatMode: REPEAT_MODE,
        imageUrl: IMAGE_URL
      });
      expect(fill.visible).to.equal(VISIBLE);
      expect(fill.opacity).to.equal(OPACITY);
      expect(fill.color).to.equal(COLOR);
      expect(fill.gradientType).to.equal(GRADIENT_TYPE);
      expect(fill.gradientAngle).to.equal(GRADIENT_ANGLE);
      expect(fill.gradientStops).to.deep.equal(GRADIENT_STOPS);
      expect(fill.scaleMode).to.equal(SCALE_MODE);
      expect(fill.repeatMode).to.equal(REPEAT_MODE);
      expect(fill.imageUrl).to.equal(IMAGE_URL);
    });
  });
  let fill: Fill;
  beforeEach(() => {
    fill = new Fill({
      visible: VISIBLE,
      opacity: OPACITY,
      color: COLOR,
      gradientType: GRADIENT_TYPE,
      gradientAngle: GRADIENT_ANGLE,
      gradientStops: GRADIENT_STOPS,
      scaleMode: SCALE_MODE,
      repeatMode: REPEAT_MODE,
      imageUrl: IMAGE_URL
    });
  });
  describe('getGradientTypeCSSString()', () => {
    it('returns the correct CSS string for the gradient type', () => {
      let newFill: Fill;
      newFill = fill.set('gradientType', GradientType.LINEAR);
      expect(newFill.getGradientTypeCSSString()).to.equal('linear-gradient');
      newFill = fill.set('gradientType', GradientType.RADIAL);
      expect(newFill.getGradientTypeCSSString()).to.equal('radial-gradient');
    });
    it('returns \'linear-gradient\' if the gradient type is null', () => {
      const newFill = fill.set('gradientType', null);
      expect(newFill.getGradientTypeCSSString()).to.equal('linear-gradient');
    });
  });
  describe('getGradientCSSString()', () => {
    it('returns the gradient string for a radial gradient', () => {
      const newFill = fill.set('gradientType', GradientType.RADIAL);
      expect(newFill.getGradientCSSString()).to.equal('radial-gradient(circle, rgba(0, 255, 0, 0.8) 0%, rgba(0, 0, 255, 0.4) 100%)');
    });
    it('returns the gradient string for a linear gradient', () => {
      const newFill = fill.set('gradientType', GradientType.LINEAR);
      expect(newFill.getGradientCSSString()).to.equal('linear-gradient(25deg, rgba(0, 255, 0, 0.8) 0%, rgba(0, 0, 255, 0.4) 100%)');
    });
  });
  describe('getScaleModeCSSString()', () => {
    it('returns the correct CSS string for the image scale mode', () => {
      let newFill: Fill;
      newFill = fill.set('scaleMode', ImageScaleMode.FIT);
      expect(newFill.getScaleModeCSSString()).to.equal('contain');
      newFill = fill.set('scaleMode', ImageScaleMode.FILL);
      expect(newFill.getScaleModeCSSString()).to.equal('cover');
      newFill = fill.set('scaleMode', ImageScaleMode.STRETCH);
      expect(newFill.getScaleModeCSSString()).to.equal('100% 100%');
    });
    it('returns undefined if the image scale mode is null', () => {
      let newFill: Fill;
      newFill = fill.set('scaleMode', null);
      expect(newFill.getScaleModeCSSString()).to.be.undefined;
    });
    it('returns undefined if the image scale mode is REPEAT', () => {
      let newFill: Fill;
      newFill = fill.set('scaleMode', ImageScaleMode.REPEAT);
      expect(newFill.getScaleModeCSSString()).to.be.undefined;
    });
  });
  describe('getRepeatModeCSSString()', () => {
    it('returns the correct CSS string for the image repeat mode', () => {
      let newFill: Fill;
      newFill = fill.set('repeatMode', ImageRepeatMode.REPEAT);
      expect(newFill.getRepeatModeCSSString()).to.equal('repeat');
      newFill = fill.set('repeatMode', ImageRepeatMode.REPEAT_X);
      expect(newFill.getRepeatModeCSSString()).to.equal('repeat-x');
      newFill = fill.set('repeatMode', ImageRepeatMode.REPEAT_Y);
      expect(newFill.getRepeatModeCSSString()).to.equal('repeat-y');
    });
    it('returns \'no-repeat\' if the image repeat mode is null', () => {
      let newFill: Fill;
      newFill = fill.set('repeatMode', null);
      expect(newFill.getRepeatModeCSSString()).to.equal('no-repeat');
    });
  });
  describe('toStrokeCSS()', () => {
    it('returns an empty object if the strokeWeight argument is null', () => {
      expect(fill.toStrokeCSS(null, null)).to.be.empty;
    });
    it('returns an empty object if the Fill is not visible', () => {
      const newFill = fill.set('visible', false);
      expect(newFill.toStrokeCSS(1, null)).to.be.empty;
    });
    it('returns an the correct CSS for the strokeAlign property', () => {
      const STROKE_WEIGHT = 1;
      const outsideCSS = fill.toStrokeCSS(STROKE_WEIGHT, StrokeAlign.OUTSIDE);
      expect(outsideCSS).to.have.property('boxShadow');
      expect(outsideCSS.boxShadow).to.equal(`0px 0px 0px ${STROKE_WEIGHT}px rgba(255, 0, 0, 0.8)`);
      const insideCSS = fill.toStrokeCSS(STROKE_WEIGHT, StrokeAlign.INSIDE);
      expect(insideCSS).to.have.property('boxShadow');
      expect(insideCSS.boxShadow).to.equal(`inset 0px 0px 0px ${STROKE_WEIGHT}px rgba(255, 0, 0, 0.8)`);
      const centerCSS = fill.toStrokeCSS(STROKE_WEIGHT, StrokeAlign.CENTER);
      expect(centerCSS).to.have.property('borderColor');
      expect(centerCSS).to.have.property('borderStyle');
      expect(centerCSS).to.have.property('borderWidth');
      expect(centerCSS.borderColor).to.equal('rgba(255, 0, 0, 0.8)');
      expect(centerCSS.borderStyle).to.equal('solid');
      expect(centerCSS.borderWidth).to.equal(STROKE_WEIGHT);
    });
    it('returns a center aligned stroke when the strokeAlign property is null', () => {
      const STROKE_WEIGHT = 1;
      const centerCSS = fill.toStrokeCSS(STROKE_WEIGHT, StrokeAlign.CENTER);
      expect(centerCSS).to.have.property('borderColor');
      expect(centerCSS).to.have.property('borderStyle');
      expect(centerCSS).to.have.property('borderWidth');
      expect(centerCSS.borderColor).to.equal('rgba(255, 0, 0, 0.8)');
      expect(centerCSS.borderStyle).to.equal('solid');
      expect(centerCSS.borderWidth).to.equal(STROKE_WEIGHT);
    });
  });
  describe('toFillCSS()', () => {
    it('returns an empty object if the Fill is not visible', () => {
      const newFill = fill.set('visible', false);
      expect(newFill.toFillCSS()).to.be.empty;
    });
    it('returns image fill CSS if the imageUrl property is not null', () => {
      const newFill = fill.set('imageUrl', IMAGE_URL);
      const imageFillCSS = newFill.toFillCSS();
      expect(imageFillCSS).to.have.property('backgroundColor');
      expect(imageFillCSS).to.have.property('backgroundImage');
      expect(imageFillCSS).to.have.property('backgroundSize');
      expect(imageFillCSS).to.have.property('backgroundPosition');
      expect(imageFillCSS).to.have.property('backgroundRepeat');
      expect(imageFillCSS.backgroundColor).to.equal('rgba(255,255,255,0.8)');
      expect(imageFillCSS.backgroundImage).to.equal('url(test.url)');
      expect(imageFillCSS.backgroundSize).to.equal(newFill.getScaleModeCSSString());
      expect(imageFillCSS.backgroundPosition).to.equal('center');
      expect(imageFillCSS.backgroundRepeat).to.equal(newFill.getRepeatModeCSSString());
    });
    it('returns background gradient CSS if the gradientType property is not null', () => {
      const newFill = fill.set('imageUrl', null).set('gradientType', GradientType.LINEAR);
      const gradientFillCSS = newFill.toFillCSS();
      expect(gradientFillCSS).to.have.property('backgroundImage');
      expect(gradientFillCSS.backgroundImage).to.equal(newFill.getGradientCSSString());
    });
    it('returns background color CSS if the color property is not null', () => {
      const newFill = fill.set('gradientType', null).set('imageUrl', null);
      const colorFillCSS = newFill.toFillCSS();
      expect(colorFillCSS).to.have.property('backgroundColor');
      expect(colorFillCSS.backgroundColor).to.equal(COLOR.toString(OPACITY));
    });
  });
});
