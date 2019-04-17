import 'mocha';
import { expect } from 'chai';
import { VectorPath, VectorPoint, Vector, defaultVectorPath, Size } from '../../../src';
import { List } from 'immutable';
import uuid from 'uuid/v4';

describe('VectorPath immutable', () => {
  const ID = uuid();
  const POINT_0_POS = new Vector({
    x: 10, y: 12
  });
  const POINT_0 = new VectorPoint({
    position: POINT_0_POS
  });
  const POINT_1_POS = new Vector({
    x: 0, y: 0
  });
  const POINT_1 = new VectorPoint({
    position: POINT_1_POS
  });
  const POINT_2_POS = new Vector({
    x: 20, y: 20
  });
  const POINT_2 = new VectorPoint({
    position: POINT_2_POS
  });
  const POINTS = List([
    POINT_0,
    POINT_1,
    POINT_2
  ]);
  const OPEN = false;
  describe('constructor()', () => {
    it('constructs a new VectorPath with the given properties', () => {
      const vectorPath = new VectorPath({
        id: ID,
        points: POINTS,
        open: OPEN
      });
      expect(vectorPath.id).to.equal(ID);
      expect(vectorPath.points).to.deep.equal(POINTS);
      expect(vectorPath.open).to.be.undefined;
    });
    it('constructs a default VectorPath when no properties are given', () => {
      const vectorPath = new VectorPath();
      expect(vectorPath.id).to.not.be.null;
      expect(vectorPath.points).to.equal(defaultVectorPath.points);
      expect(vectorPath.open).to.equal(defaultVectorPath.open);
    });
  });
  describe('toRaw()', () => {
    it('returns a RawVectorPath object', () => {
      const vectorPath = new VectorPath();
      expect(vectorPath.toRaw()).to.deep.equal({
        id: vectorPath.id,
        points: [],
        open: vectorPath.open
      });
    });
  });
  describe('static fromRaw()', () => {
    it('instantiates a new VectorPath immutable from a RawVectorPath', () => {
      const ID = uuid();
      const OPEN = false;
      const vectorPath = VectorPath.fromRaw({
        id: ID,
        points: [],
        open: OPEN
      });
      expect(vectorPath.id).to.equal(ID);
      expect(vectorPath.open).to.be.undefined;
      expect(vectorPath.points).to.deep.equal(List([]))
    });
  });
  let vectorPath: VectorPath;
  beforeEach(() => {
    vectorPath = new VectorPath({
      id: ID,
      points: POINTS,
      open: OPEN
    });
  });
  describe('getPosition()', () => {
    it('returns the position of the VectorPath', () => {
      expect(vectorPath.getPosition().toObject()).to.deep.equal(POINT_1_POS.toObject());
    });
  });
  describe('getSize()', () => {
    it('returns the size of the VectorPath', () => {
      expect(vectorPath.getSize().toObject()).to.deep.equal({
        width: POINT_2_POS.x - POINT_1_POS.x,
        height: POINT_2_POS.y - POINT_1_POS.y
      });
    });
  });
  describe('getBoundingBox()', () => {
    it('returns the BoundingBox of the VectorPath', () => {
      const boundingBox = vectorPath.getBoundingBox();
      expect(boundingBox.getMinX()).to.equal(POINT_1_POS.x);
      expect(boundingBox.getMinY()).to.equal(POINT_1_POS.y);
      expect(boundingBox.getMaxX()).to.equal(POINT_1_POS.x + POINT_2_POS.x);
      expect(boundingBox.getMaxY()).to.equal(POINT_1_POS.y + POINT_2_POS.y);
    });
  });
  describe('getTransformedBoundingBox()', () => {
    it('returns the BoundingBox of the VectorPath after transformations', () => {
      // TODO: Add actual tests for the actually implemented function
      const boundingBox = vectorPath.getTransformedBoundingBox();
      expect(boundingBox.getMinX()).to.equal(POINT_1_POS.x);
      expect(boundingBox.getMinY()).to.equal(POINT_1_POS.y);
      expect(boundingBox.getMaxX()).to.equal(POINT_1_POS.x + POINT_2_POS.x);
      expect(boundingBox.getMaxY()).to.equal(POINT_1_POS.y + POINT_2_POS.y);
    });
  });
  describe('setPosition()', () => {
    it('sets the position of the VectorPath', () => {
      const ADD_X = 20;
      const ADD_Y = 30;
      const newPosition = new Vector({ x: POINT_1_POS.x + ADD_X, y: POINT_1_POS.y + ADD_Y });
      const newVectorPath = vectorPath.setPosition(newPosition);
      newVectorPath.points.forEach((point, index) => {
        const oldPos = POINTS.get(index)!.position;
        const newPos = point.position;
        expect(newPos.x).to.equal(oldPos.x + ADD_X);
        expect(newPos.y).to.equal(oldPos.y + ADD_Y);
      });
    });
  });
  describe('setSize()', () => {
    it('sets the size of the VectorPath', () => {
      const MULT_WIDTH = 2.0;
      const MULT_HEIGHT = 1.5;
      const oldSize = vectorPath.getSize();
      const newSize = new Size({ width: oldSize.width * MULT_WIDTH, height: oldSize.height * MULT_HEIGHT });
      const newVectorPath = vectorPath.setSize(newSize);
      newVectorPath.points.forEach((point, index) => {
        const oldPos = POINTS.get(index)!.position;
        const newPos = point.position;
        expect(newPos.x).to.equal(oldPos.x * MULT_WIDTH);
        expect(newPos.y).to.equal(oldPos.y * MULT_HEIGHT);
      });
    });
  });
});
