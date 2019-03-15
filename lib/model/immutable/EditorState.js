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
        _this.selectionGroup = config.selectionGroup || null;
        return _this;
    }
    EditorState.createEmpty = function () {
        return new EditorState({});
    };
    EditorState.createWithDocument = function (document) {
        return new EditorState({ document: document });
    };
    EditorState.prototype.getSelectedNodes = function () {
        return this.document.getNodes(this.selected);
    };
    EditorState.prototype.deselectAll = function () {
        var newDocument = this.getDocument();
        if (this.selectionGroup) {
            // Update the nodes to match the versions in the selection group
            for (var _i = 0, _a = this.selectionGroup.getNodes(); _i < _a.length; _i++) {
                var node = _a[_i];
                newDocument = newDocument.updateNode(node);
            }
        }
        return new EditorState({
            document: newDocument,
            selected: [],
            selectionGroup: null
        });
    };
    EditorState.prototype.getDocument = function () {
        return this.document;
    };
    EditorState.prototype.setDocument = function (document) {
        return new EditorState(tslib_1.__assign({}, this.toJS(), { document: document }));
    };
    EditorState.prototype.getSelectionGroup = function () {
        return this.selectionGroup;
    };
    EditorState.prototype.setSelectionGroup = function (group) {
        return new EditorState(tslib_1.__assign({}, this.toJS(), { selectionGroup: group }));
    };
    EditorState.prototype.getSelectedIds = function () {
        return this.selected;
    };
    EditorState.prototype.select = function (id, multiple) {
        var newSelected = multiple ? this.selected.concat([id]) : [id];
        var newSelectedNodes = this.document.getNodes(newSelected);
        return new EditorState({
            document: this.getDocument(),
            selected: newSelected,
            selectionGroup: multiple ? new GroupNode({
                id: shortid.generate(),
                visible: true,
                opacity: 1.0,
                nodes: newSelectedNodes
            }) : null
        });
    };
    EditorState.prototype.toJS = function () {
        return {
            document: this.document,
            selected: this.selected,
            selectionGroup: this.selectionGroup
        };
    };
    EditorState.prototype.toRaw = function () { };
    return EditorState;
}(Immutable));
export { EditorState };
