import * as tslib_1 from "tslib";
import { Record, List } from 'immutable';
var defaultDocument = {
    nodes: List(),
    width: 1920,
    height: 1080
};
var Document = /** @class */ (function (_super) {
    tslib_1.__extends(Document, _super);
    function Document() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates a document of a list of nodes.
     * @param nodes The nodes to include in the document.
     */
    Document.of = function (nodes) {
        return new Document({ nodes: List(nodes) });
    };
    /**
     * Gets a node by ID.
     * @param id The ID of the node.
     */
    Document.prototype.getNodeByID = function (id) {
        var found = this.nodes.find(function (node) {
            return node.id === id;
        });
        if (found)
            return found;
        return null;
    };
    /**
     * Gets multiple nodes by ID.
     * @param ids The IDs of the nodes to get.
     */
    Document.prototype.getNodesByID = function (ids) {
        return this.nodes.filter(function (node) {
            return ids.includes(node.id);
        });
    };
    /**
     * Returns the IDs of all the nodes.
     */
    Document.prototype.getNodeIDs = function () {
        return this.nodes.map(function (node) {
            return node.id;
        });
    };
    /**
     * Updates a node.
     * @param node The new version of the node to update.
     */
    Document.prototype.updateNode = function (node) {
        return this.set('nodes', this.nodes.map(function (oldNode) {
            if (oldNode.id === node.id) {
                return node;
            }
            return oldNode;
        }));
    };
    /**
     * Updates multiple nodes.
     * @param nodes The new versions of the nodes to update.
     */
    Document.prototype.updateNodes = function (nodes) {
        return this.set('nodes', this.nodes.map(function (oldNode) {
            var e_1, _a;
            try {
                for (var nodes_1 = tslib_1.__values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                    var newNode = nodes_1_1.value;
                    if (newNode.id === oldNode.id) {
                        return newNode;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return oldNode;
        }));
    };
    /**
     * Removes a node.
     * @param node The node to remove.
     */
    Document.prototype.removeNode = function (node) {
        return this.set('nodes', this.nodes.filterNot(function (oldNode) {
            return oldNode.id === node.id;
        }));
    };
    /**
     * Removes nodes.
     * @param nodes The nodes to remove.
     */
    Document.prototype.removeNodes = function (nodes) {
        return this.set('nodes', this.nodes.filterNot(function (oldNode) {
            return Boolean(nodes.find(function (node) {
                return node.id === oldNode.id;
            }));
        }));
    };
    /**
     * Removes a node by ID.
     * @param id The ID of the node to remove.
     */
    Document.prototype.removeNodeByID = function (id) {
        return this.set('nodes', this.nodes.filterNot(function (oldNode) {
            return oldNode.id === id;
        }));
    };
    /**
     * Removes multiple nodes by ID.
     * @param ids The IDs of the nodes to remove.
     */
    Document.prototype.removeNodesByID = function (ids) {
        return this.set('nodes', this.nodes.filterNot(function (oldNode) {
            return ids.includes(oldNode.id);
        }));
    };
    /**
     * Adds a node to the document.
     * New nodes are always added to the top of the document.
     * @param node The node to add.
     */
    Document.prototype.addNode = function (node) {
        return this.set('nodes', this.nodes.insert(0, node));
    };
    /**
     * Adds nodes to the document.
     * New nodes are always added to the top of the document.
     * @param nodes The nodes to add.
     */
    Document.prototype.addNodes = function (nodes) {
        return this.set('nodes', List(tslib_1.__spread(nodes, this.nodes)));
    };
    return Document;
}(Record(defaultDocument)));
export { Document };
