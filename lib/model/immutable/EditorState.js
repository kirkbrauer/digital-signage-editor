import * as tslib_1 from "tslib";
import { Document } from './Document';
import { GroupNode } from './nodes';
import shortid from 'shortid';
import { Immutable } from './Immutable';
/**
 * Editor state object.
 */
var EditorState = /** @class */ (function (_super) {
    tslib_1.__extends(EditorState, _super);
    function EditorState(config) {
        var _this = _super.call(this) || this;
        _this.document = config.document || Document.createEmpty();
        _this.selected = config.selected || [];
        _this.editing = config.editing || null;
        _this.selectionGroup = config.selectionGroup || null;
        return _this;
    }
    /**
     * Static method to create an empty editor state.
     */
    EditorState.createEmpty = function () {
        return new EditorState({});
    };
    /**
     * Static method to create an editor state with a document.
     * @param document The document for the editor state.
     */
    EditorState.createWithDocument = function (document) {
        return new EditorState({ document: document });
    };
    /**
     * Returns the currently selected nodes.
     */
    EditorState.prototype.getSelectedNodes = function () {
        return this.document.getNodes(this.selected);
    };
    /**
     * Deselects all currently selected nodes.
     */
    EditorState.prototype.deselectAll = function () {
        var newDocument = this.getDocument();
        if (this.selectionGroup) {
            // Update the nodes to match the versions in the selection group
            for (var _i = 0, _a = this.selectionGroup.getNodes(); _i < _a.length; _i++) {
                var node = _a[_i];
                newDocument = newDocument.updateNode(node);
            }
        }
        return this.cloneWith({
            document: newDocument,
            selected: [],
            editing: null,
            selectionGroup: null
        });
    };
    /**
     * Returns the height of the current selection.
     */
    EditorState.prototype.getSelectionHeight = function () {
        if (this.selectionGroup) {
            return this.selectionGroup.getHeight();
        }
        if (this.selected.length === 1) {
            return this.getSelectedNodes()[0].getHeight();
        }
        return 0;
    };
    /**
     * Returns the width of the current selection.
     */
    EditorState.prototype.getSelectionWidth = function () {
        if (this.selectionGroup) {
            return this.selectionGroup.getWidth();
        }
        if (this.selected.length === 1) {
            return this.getSelectedNodes()[0].getWidth();
        }
        return 0;
    };
    /**
     * Returns the position of the current selection.
     */
    EditorState.prototype.getSelectionPosition = function () {
        if (this.selectionGroup) {
            return this.selectionGroup.getPosition();
        }
        if (this.selected.length === 1) {
            return this.getSelectedNodes()[0].getPosition();
        }
        return { x: 0, y: 0 };
    };
    /**
     * Returns the x position of the current selection.
     */
    EditorState.prototype.getSelectionXPos = function () {
        return this.getSelectionPosition().x;
    };
    /**
      * Returns the y position of the current selection.
      */
    EditorState.prototype.getSelectionYPos = function () {
        return this.getSelectionPosition().y;
    };
    /**
     * Returns the current document.
     */
    EditorState.prototype.getDocument = function () {
        return this.document;
    };
    /**
     * Sets the current document.
     * @param document The new document.
     */
    EditorState.prototype.setDocument = function (document) {
        return this.cloneWith({
            document: document
        });
    };
    /**
     * Returns the selection group.
      */
    EditorState.prototype.getSelectionGroup = function () {
        return this.selectionGroup;
    };
    /**
     * Sets the selection group.
     * @param group The new selection group.
     */
    EditorState.prototype.setSelectionGroup = function (group) {
        return this.cloneWith({
            selectionGroup: group
        });
    };
    /**
     * Syncronizes the document with the selection group.
     */
    EditorState.prototype.sync = function () {
        var newDocument;
        // Syncronize each node in the document
        for (var _i = 0, _a = this.selectionGroup.getNodes(); _i < _a.length; _i++) {
            var node = _a[_i];
            newDocument = this.document.updateNode(node);
        }
        return this.setDocument(newDocument);
    };
    /**
     * Updates the selection group and syncronizes the document with it.
     * @param group The updated selection group.
     */
    EditorState.prototype.updateSelectionGroup = function (group) {
        var newState = this.setSelectionGroup(group);
        return newState.sync();
    };
    /**
     * Returns the IDs of the currently selected nodes.
     */
    EditorState.prototype.getSelectedIds = function () {
        return this.selected;
    };
    /**
     * Selectes a node.
     * @param id The ID of the node to select.
     * @param multiple
     */
    EditorState.prototype.select = function (id, multiple) {
        // The new selected node IDs
        var newSelected = multiple ? this.selected.concat([id]) : [id];
        // Get the nodes to put in the selection group
        var newSelectedNodes = this.document.getNodes(newSelected);
        return this.cloneWith({
            selected: newSelected,
            selectionGroup: multiple ? new GroupNode({
                id: shortid.generate(),
                visible: true,
                opacity: 1.0,
                nodes: newSelectedNodes
            }) : null
        });
    };
    /**
     * Starts editing a node.
     * @param id The ID of the node to edit.
     */
    EditorState.prototype.edit = function (id) {
        return this.cloneWith({
            editing: id
        });
    };
    /**
     * Returns the ID of the node currently being edited.
     */
    EditorState.prototype.getEditId = function () {
        return this.editing;
    };
    /**
     * Returns the node currently being edited.
     */
    EditorState.prototype.getEditNode = function () {
        return this.getDocument().getNode(this.editing || '');
    };
    /**
     * Stops editing a node.
     */
    EditorState.prototype.stopEditing = function () {
        return this.cloneWith({
            editing: null
        });
    };
    EditorState.prototype.toJS = function () {
        return {
            document: this.document,
            selected: this.selected,
            editing: this.editing,
            selectionGroup: this.selectionGroup
        };
    };
    EditorState.prototype.toRaw = function () { };
    return EditorState;
}(Immutable));
export { EditorState };
