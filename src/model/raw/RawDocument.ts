import { RawNode } from './RawNode';

export interface RawDocument {

  /**
   * Nodes in the current document.
   */
  nodes: RawNode[];

  /**
   * The width of the document.
   */
  width: number;

  /**
   * The height of the document.
   */
  height: number;

}