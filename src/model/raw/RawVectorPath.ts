import { RawVectorPoint } from './RawVectorPoint';
import { RawVector } from './RawVector';

/**
 * A vector path.
 */
export interface RawVectorPath {

  /**
   * The ID of the vector path.
   */
  id: string;

  /**
   * The position of the vector path.
   */
  position: RawVector;
  
  /**
   * An array of points that make up the path.
   */
  points: RawVectorPoint[];
  
  /**
   * Whether the path is open.
   * Paths open between their first and last points.
   */
  open?: boolean;
  
}