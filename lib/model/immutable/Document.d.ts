import { Node } from './nodes';
import { Immutable } from './Immutable';
export interface DocumentConfig {
    nodes?: Node[];
    width?: number;
    height?: number;
}
/**
 * An editor document.
 */
export declare class Document extends Immutable<DocumentConfig, any> {
    /**
     * Nodes in the current document.
     */
    private nodes;
    /**
     * Document width in px.
     */
    private width;
    /**
     * Document height in px.
     */
    private height;
    static createEmpty(): Document;
    constructor(config: DocumentConfig);
    getNodes(ids?: string[]): Node[];
    getNodeIds(): string[];
    getHeight(): number;
    getWidth(): number;
    getNode(id: string): Node | null;
    updateNode(newNode: Node): Document;
    removeNode(id: string): Document;
    addNode(node: Node): Document;
    toJS(): DocumentConfig;
    toRaw(): void;
}
