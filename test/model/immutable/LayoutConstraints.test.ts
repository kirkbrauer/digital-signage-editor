import 'mocha';
import { expect } from 'chai';
import { LayoutConstraints, Constraint } from '../../../src';

describe('LayoutConstraints immutable', () => {
  describe('constructor()', () => {
    it('constructs a new LayoutConstraints with the given properties', () => {
      const HORIZONTAL_CONSTRAINT = Constraint.CENTER;
      const VERTICAL_CONSTRAINT = Constraint.CENTER;
      const layoutConstraints = new LayoutConstraints({
        horizontal: HORIZONTAL_CONSTRAINT,
        vertical: VERTICAL_CONSTRAINT
      });
      expect(layoutConstraints.horizontal).to.equal(HORIZONTAL_CONSTRAINT);
      expect(layoutConstraints.vertical).to.equal(VERTICAL_CONSTRAINT);
    });
    it('constructs a default LayoutConstraints when no properties are given', () => {
      const layoutConstraints = new LayoutConstraints();
      expect(layoutConstraints.horizontal).to.be.null;
      expect(layoutConstraints.vertical).to.be.null;
    });
  });
});