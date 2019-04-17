import { expect } from 'chai';
import { Document, convertToRaw, RawDocument, convertFromRaw } from '../../src';
import { List } from 'immutable';

describe('convertToRaw()', () => {
  it ('should convert an empty document to raw', () => {
    const document = new Document();
    const raw = convertToRaw(document);
    expect(raw.width).to.equal(1920);
    expect(raw.height).to.equal(1080);
    expect(raw.nodes).to.be.empty;
  });
});

describe('convertFromRaw()', () => {
  it('should convert an empty raw document to an immutable object', () => {
    const rawDocument: RawDocument = {
      nodes: [],
      width: 1,
      height: 2
    };
    const document = convertFromRaw(rawDocument);
    expect(document.width).to.equal(1);
    expect(document.height).to.equal(2);
    // Make sure that nodes is actually an immutable List
    expect(document.nodes).to.be.an.instanceOf(List);
  });
});