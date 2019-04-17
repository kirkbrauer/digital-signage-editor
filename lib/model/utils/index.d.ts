import { RawDocument } from '../raw';
import { Document } from '../immutable';
export declare function convertToRaw(document: Document): RawDocument;
export declare function convertFromRaw(rawDocument: RawDocument): Document;
