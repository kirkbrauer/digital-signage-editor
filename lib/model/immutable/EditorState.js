import * as tslib_1 from "tslib";
import { Record, List } from 'immutable';
import { Document } from './Document';
import { Node, NodeType } from './Node';
import uuid from 'uuid';
var defaultEditorState = {
    document: new Document(),
    selectedIDs: List(),
    editing: null,
    clipboard: List(),
    selectionGroup: null
};
var EditorState = /** @class */ (function (_super) {
    tslib_1.__extends(EditorState, _super);
    function EditorState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates an editor state of a document.
     * @param document The document.
     */
    EditorState.of = function (document) {
        return new EditorState({ document: document });
    };
    /**
     * Returns the x position of the current selection.
     */
    EditorState.prototype.getSelectionX = function () {
        if (this.selectedIDs.count() === 1) {
            return this.document.getNodeByID(this.selectedIDs.get(0)).getX();
        }
        if (this.selectionGroup) {
            return this.selectionGroup.getX();
        }
        return 0;
    };
    /**
     * Returns the y position of the current selection.
     */
    EditorState.prototype.getSelectionY = function () {
        if (this.selectedIDs.count() === 1) {
            return this.document.getNodeByID(this.selectedIDs.get(0)).getY();
        }
        if (this.selectionGroup) {
            return this.selectionGroup.getY();
        }
        return 0;
    };
    /**
     * Returns the width of the current selection.
     */
    EditorState.prototype.getSelectionWidth = function () {
        if (this.selectedIDs.count() === 1) {
            return this.document.getNodeByID(this.selectedIDs.get(0)).getWidth();
        }
        if (this.selectionGroup) {
            return this.selectionGroup.getWidth();
        }
        return 0;
    };
    /**
     * Returns the height of the current selection.
     */
    EditorState.prototype.getSelectionHeight = function () {
        if (this.selectedIDs.count() === 1) {
            return this.document.getNodeByID(this.selectedIDs.get(0)).getHeight();
        }
        if (this.selectionGroup) {
            return this.selectionGroup.getHeight();
        }
        return 0;
    };
    /**
     * Returns the node that is currently being edited.
     */
    EditorState.prototype.getEditNode = function () {
        if (this.editing) {
            return this.document.getNodeByID(this.editing);
        }
        return null;
    };
    /**
     * Returns a list of currently selected nodes.
     */
    EditorState.prototype.getSelectedNodes = function () {
        return this.document.getNodesByID(this.selectedIDs);
    };
    /**
     * Updates the selction group.
     * The function also syncronizes the document with the selection group.
     * @param node The new selection group.
     */
    EditorState.prototype.updateSelectionGroup = function (node) {
        return this
            .set('selectionGroup', node)
            .set('document', this.document.updateNodes(node.nodes));
    };
    /**
     * Selects a node.
     * @param id The ID of the node to select.
     * @param multiple Should multiple nodes be allowed to be selected.
     */
    EditorState.prototype.select = function (id, multiple) {
        var newState = this.set('selectedIDs', multiple ? this.selectedIDs.push(id) : List.of(id));
        if (multiple && newState.selectedIDs.count() > 1) {
            return newState.set('selectionGroup', new Node({
                type: NodeType.GROUP,
                nodes: newState.getSelectedNodes()
            }));
        }
        return newState.set('selectionGroup', null);
    };
    /**
     * Deselects all nodes.
     */
    EditorState.prototype.deselectAll = function () {
        return this.set('selectedIDs', List()).set('selectionGroup', null);
    };
    /**
     * Selects all nodes in the document.
     */
    EditorState.prototype.selectAll = function () {
        var e_1, _a;
        var newState = this.clone();
        try {
            for (var _b = tslib_1.__values(this.selectedIDs), _c = _b.next(); !_c.done; _c = _b.next()) {
                var id = _c.value;
                newState = this.select(id, true);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return newState;
    };
    /**
     * Copies nodes by ID.
     * @param ids The IDs of the nodes to copy.
     */
    EditorState.prototype.copy = function (ids) {
        return this.set('clipboard', this.document.getNodesByID(ids));
    };
    /**
     * Cuts nodes by ID.
     * @param ids The IDs of the nodes to cut.
     */
    EditorState.prototype.cut = function (ids) {
        return this.set('clipboard', this.document.getNodesByID(ids)).set('document', this.document.removeNodesByID(ids));
    };
    /**
     * Pastes the clipboard contents.
     * @param select Should the pasted nodes be selected.
     */
    EditorState.prototype.paste = function (select) {
        var e_2, _a;
        var newIDs = [];
        var state = this.set('document', this.document.addNodes(this.clipboard.map(function (node) {
            // Give each of the pasted nodes a new ID
            var newID = uuid();
            newIDs.push(newID);
            return node.set('id', newID);
        })));
        // Clear all previous selections
        state = state.deselectAll();
        // Select pasted nodes
        if (select) {
            try {
                for (var newIDs_1 = tslib_1.__values(newIDs), newIDs_1_1 = newIDs_1.next(); !newIDs_1_1.done; newIDs_1_1 = newIDs_1.next()) {
                    var newID = newIDs_1_1.value;
                    state = state.select(newID, true);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (newIDs_1_1 && !newIDs_1_1.done && (_a = newIDs_1.return)) _a.call(newIDs_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return state;
    };
    /**
     * Clears the clipboard.
     */
    EditorState.prototype.clearClipboard = function () {
        return this.set('clipboard', List());
    };
    /**
     * Copies the current selection.
     */
    EditorState.prototype.copySelection = function () {
        return this.copy(this.selectedIDs);
    };
    /**
     * Cuts the current selection.
     */
    EditorState.prototype.cutSelection = function () {
        return this.cut(this.selectedIDs).set('selectedIDs', List()).set('selectionGroup', null);
    };
    /**
     * Clones the editor state.
     */
    EditorState.prototype.clone = function () {
        return this;
    };
    return EditorState;
}(Record(defaultEditorState)));
export { EditorState };
