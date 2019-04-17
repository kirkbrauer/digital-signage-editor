import { Record, List } from 'immutable';
import { Node } from './Node';
import { Serializable } from './Serializable';
import { RawDocument } from '../raw';
export interface IDocument {
    /**
     * Nodes in the current document.
     */
    nodes: List<Node>;
    /**
     * The width of the document.
     */
    width: number;
    /**
     * The height of the document.
     */
    height: number;
}
export declare const defaultDocument: IDocument;
declare const Document_base: Record.Factory<IDocument>;
export declare class Document extends Document_base implements Serializable<RawDocument> {
    /**
     * Creates a document of a list of nodes.
     * @param nodes The nodes to include in the document.
     */
    static of(nodes: Iterable<Node>): Document;
    /**
     * Gets a node by ID.
     * @param id The ID of the node.
     */
    getNodeByID(id?: string): Node | null;
    /**
     * Gets multiple nodes by ID.
     * @param ids The IDs of the nodes to get.
     */
    getNodesByID(ids: List<string>): List<Node>;
    /**
     * Returns the IDs of all the nodes.
     */
    getNodeIDs(): List<string>;
    /**
     * Updates a node.
     * @param node The new version of the node to update.
     */
    updateNode(node: Node): this;
    /**
     * Updates multiple nodes.
     * @param nodes The new versions of the nodes to update.
     */
    updateNodes(nodes: List<Node>): this;
    /**
     * Removes a node.
     * @param node The node to remove.
     */
    removeNode(node: Node): this;
    /**
     * Removes nodes.
     * @param nodes The nodes to remove.
     */
    removeNodes(nodes: List<Node>): this;
    /**
     * Removes a node by ID.
     * @param id The ID of the node to remove.
     */
    removeNodeByID(id: string): this;
    /**
     * Removes multiple nodes by ID.
     * @param ids The IDs of the nodes to remove.
     */
    removeNodesByID(ids: List<string>): this;
    /**
     * Adds a node to the document.
     * New nodes are always added to the top of the document.
     * @param node The node to add.
     */
    addNode(node: Node): this;
    /**
     * Adds nodes to the document.
     * New nodes are always added to the top of the document.
     * @param nodes The nodes to add.
     */
    addNodes(nodes: List<Node>): this;
    /**
     * Changes a node's index in the node list.
     * @param id The ID of the node to change the index of.
     * @param delta How many places to move the node in the list.
     */
    private changeNodeIndex;
    /**
     * Brings nodes to front.
     * @param ids The IDs of the nodes to bring to front.
     */
    bringToFront(ids: List<string>): this;
    /**
     * Sends nodes to back.
     * @param ids The IDs of the nodes to send to back.
     */
    sendToBack(ids: List<string>): this;
    /**
     * Brings nodes one level forward.
     * @param ids The IDs of the nodes to bring forward.
     */
    bringForward(ids: List<string>): this;
    /**
     * Sends nodes one level back.
     * @param ids The IDs of the nodes to send back.
     */
    sendBackward(ids: List<string>): this;
    /**
     * Clones the document.
     */
    clone(): this;
    toRaw(): RawDocument;
    static fromRaw(raw: RawDocument): Document;
}
export {};
