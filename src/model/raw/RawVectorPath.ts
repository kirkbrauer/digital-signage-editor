import { RawVectorPoint } from './RawVectorPoint';

/**
 * A vector path.
 */
export interface RawVectorPath {

  /**
   * The ID of the vector path.
   */
  id: string;
  
  /**
   * An array of points that make up the path.
   */
  points: RawVectorPoint[];
  
  /**
   * Whether the path is open.
   * Paths open between their first and last points.
   */
  open?: boolean | null;
  
}
