import 'mocha';
import { expect } from 'chai';
import { VectorPoint, defaultVectorPoint, Vector } from '../../../src';
import uuid from 'uuid/v4';

describe('VectorPoint immutable', () => {
  const ID = uuid();
  const POSITION = new Vector({
    x: 5,
    y: 10
  });
  const CTRL_POINTS_LOCKED = true;
  const CTRL_POINT_1 = new Vector({
    x: 0,
    y: 0
  });
  const CTRL_POINT_2 = new Vector({
    x: 20,
    y: 15
  });
  describe('constructor()', () => {
    it('constructs a new VectorPoint with the given properties', () => {
      const vectorPoint = new VectorPoint({
        id: ID,
        position: POSITION,
        ctrlPointsLocked: CTRL_POINTS_LOCKED,
        ctrlPoint1: CTRL_POINT_1,
        ctrlPoint2: CTRL_POINT_2
      });
      expect(vectorPoint.id).to.equal(ID);
      expect(vectorPoint.position).to.equal(POSITION);
      expect(vectorPoint.ctrlPointsLocked).to.equal(CTRL_POINTS_LOCKED);
      expect(vectorPoint.ctrlPoint1).to.equal(CTRL_POINT_1);
      expect(vectorPoint.ctrlPoint2).to.equal(CTRL_POINT_2);
    });
    it('constructs a default VectorPoint when no properties are given', () => {
      const vectorPoint = new VectorPoint();
      expect(vectorPoint.position).to.equal(defaultVectorPoint.position);
      expect(vectorPoint.ctrlPointsLocked).to.equal(defaultVectorPoint.ctrlPointsLocked);
      expect(vectorPoint.ctrlPoint1).to.equal(defaultVectorPoint.ctrlPoint1);
      expect(vectorPoint.ctrlPoint2).to.equal(defaultVectorPoint.ctrlPoint2);
    });
  });
  describe('toRaw()', () => {
    it('returns a VectorPoint object', () => {
      const vectorPoint = new VectorPoint();
      expect(vectorPoint.toRaw()).to.deep.equal({
        id: vectorPoint.id,
        position: vectorPoint.position.toRaw(),
        ctrlPointsLocked: vectorPoint.ctrlPointsLocked,
        ctrlPoint1: null,
        ctrlPoint2: null
      });
    });
  });
  describe('static fromRaw()', () => {
    it('instantiates a new Vector immutable from a RawVector', () => {
      const vectorPoint = VectorPoint.fromRaw({
        id: ID,
        position: POSITION.toRaw(),
        ctrlPointsLocked: CTRL_POINTS_LOCKED,
        ctrlPoint1: CTRL_POINT_1.toRaw(),
        ctrlPoint2: CTRL_POINT_2.toRaw()
      });
      expect(vectorPoint.id).to.equal(ID);
      expect(vectorPoint.position.toObject()).to.deep.equal(POSITION.toObject());
      expect(vectorPoint.ctrlPointsLocked).to.equal(CTRL_POINTS_LOCKED);
      expect(vectorPoint.ctrlPoint1!.toObject()).to.deep.equal(CTRL_POINT_1.toObject());
      expect(vectorPoint.ctrlPoint2!.toObject()).to.deep.equal(CTRL_POINT_2.toObject());
    });
  });
});
