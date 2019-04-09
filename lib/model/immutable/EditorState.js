import * as tslib_1 from "tslib";
import { Record, List } from 'immutable';
import { Document } from './Document';
import { Sizeable } from './Sizeable';
import uuid from 'uuid';
var defaultEditorState = {
    document: new Document(),
    selectedIDs: List(),
    clipboard: List(),
    selectionBox: null
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
     * Returns the bounding box of a selection.
     */
    EditorState.prototype.getSelectionBoundingBox = function () {
        return Sizeable.calculateBoundingBox(this.getSelectedNodes());
    };
    /**
     * Returns the position of the current selection.
     */
    EditorState.prototype.getSelectionPosition = function () {
        return Sizeable.calculatePosition(this.getSelectedNodes());
    };
    /**
     * Returns the size of the current selection.
     */
    EditorState.prototype.getSelectionSize = function () {
        return Sizeable.calculateSize(this.getSelectedNodes());
    };
    /**
     * Returns a list of currently selected nodes.
     */
    EditorState.prototype.getSelectedNodes = function () {
        return this.document.getNodesByID(this.selectedIDs);
    };
    /**
     * Selects a node.
     * @param id The ID of the node to select.
     * @param multiple Should multiple nodes be allowed to be selected.
     */
    EditorState.prototype.select = function (id, multiple) {
        return this.set('selectedIDs', multiple ? this.selectedIDs.push(id) : List.of(id));
    };
    EditorState.prototype.deselect = function (id) {
        return this.set('selectedIDs', this.selectedIDs.filterNot(function (nodeId) { return nodeId === id; }));
    };
    /**
     * Deselects all nodes.
     */
    EditorState.prototype.deselectAll = function () {
        return this.set('selectedIDs', List());
    };
    /**
     * Selects all nodes in the document.
     */
    EditorState.prototype.selectAll = function () {
        return this.set('selectedIDs', this.document.getNodeIDs());
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
        var e_1, _a;
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
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (newIDs_1_1 && !newIDs_1_1.done && (_a = newIDs_1.return)) _a.call(newIDs_1);
                }
                finally { if (e_1) throw e_1.error; }
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
        return this.cut(this.selectedIDs).set('selectedIDs', List());
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
