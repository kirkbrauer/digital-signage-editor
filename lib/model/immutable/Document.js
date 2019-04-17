"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var Node_1 = require("./Node");
exports.defaultDocument = {
    nodes: immutable_1.List(),
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
        return new Document({ nodes: immutable_1.List(nodes) });
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
        return this.set('nodes', immutable_1.List(tslib_1.__spread(nodes, this.nodes)));
    };
    /**
     * Changes a node's index in the node list.
     * @param id The ID of the node to change the index of.
     * @param delta How many places to move the node in the list.
     */
    Document.prototype.changeNodeIndex = function (id, delta) {
        // Find the current index of the node
        var index = this.nodes.findIndex(function (node) { return node.id === id; });
        var newIndex = index + delta;
        // Do nothing if the node is already at the top or bottom
        if (newIndex < 0 || newIndex === this.nodes.count())
            return this.clone();
        // Sort the indexes
        var indexes = [index, newIndex].sort(function (a, b) { return a - b; });
        // Replace from lowest index, two elements, reverting the order
        return this.set('nodes', this.nodes.splice(indexes[0], 2, this.nodes.get(indexes[1]), this.nodes.get(indexes[0])));
    };
    /**
     * Brings nodes to front.
     * @param ids The IDs of the nodes to bring to front.
     */
    Document.prototype.bringToFront = function (ids) {
        var nodes = this.getNodesByID(ids);
        return this.set('nodes', immutable_1.List(tslib_1.__spread(nodes, this.nodes.filterNot(function (node) {
            return ids.includes(node.id);
        }))));
    };
    /**
     * Sends nodes to back.
     * @param ids The IDs of the nodes to send to back.
     */
    Document.prototype.sendToBack = function (ids) {
        var nodes = this.getNodesByID(ids);
        return this.set('nodes', immutable_1.List(tslib_1.__spread(this.nodes.filterNot(function (node) {
            return ids.includes(node.id);
        }), nodes)));
    };
    /**
     * Brings nodes one level forward.
     * @param ids The IDs of the nodes to bring forward.
     */
    Document.prototype.bringForward = function (ids) {
        var e_2, _a;
        var newDocument = this.clone();
        try {
            for (var ids_1 = tslib_1.__values(ids), ids_1_1 = ids_1.next(); !ids_1_1.done; ids_1_1 = ids_1.next()) {
                var id = ids_1_1.value;
                newDocument = newDocument.changeNodeIndex(id, -1);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (ids_1_1 && !ids_1_1.done && (_a = ids_1.return)) _a.call(ids_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return newDocument;
    };
    /**
     * Sends nodes one level back.
     * @param ids The IDs of the nodes to send back.
     */
    Document.prototype.sendBackward = function (ids) {
        var e_3, _a;
        var newDocument = this.clone();
        try {
            // Reverse the nodes so they are send backward in the correct order
            for (var _b = tslib_1.__values(ids.reverse()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var id = _c.value;
                newDocument = newDocument.changeNodeIndex(id, 1);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return newDocument;
    };
    /**
     * Clones the document.
     */
    Document.prototype.clone = function () {
        return this;
    };
    Document.prototype.toRaw = function () {
        return {
            nodes: this.nodes.map(function (node) { return node.toRaw(); }).toArray(),
            width: this.width,
            height: this.height
        };
    };
    Document.fromRaw = function (raw) {
        return new Document({
            nodes: immutable_1.List(raw.nodes.map(function (rawNode) { return Node_1.Node.fromRaw(rawNode); })),
            width: raw.width,
            height: raw.height
        });
    };
    return Document;
}(immutable_1.Record(exports.defaultDocument)));
exports.Document = Document;
