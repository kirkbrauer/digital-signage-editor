import { RawNode } from './RawNode';
import { RawColor } from './RawColor';

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

  /**
   * The background color of the document.
   */
  backgroundColor?: RawColor | null;

}
