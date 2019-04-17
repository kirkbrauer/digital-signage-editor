import { RawDocument } from './raw';
import { Document } from './immutable';

export function convertToRaw(document: Document): RawDocument {
  return document.toRaw();
}

export function convertFromRaw(rawDocument: RawDocument): Document {
  return Document.fromRaw(rawDocument);
}