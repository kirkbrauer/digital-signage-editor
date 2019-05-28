"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var immutable_1 = require("./model/immutable");
var Node_1 = tslib_1.__importDefault(require("./components/Node"));
var Selection_1 = tslib_1.__importDefault(require("./components/Selection"));
var immutable_2 = require("immutable");
var SelectionBox_1 = tslib_1.__importDefault(require("./components/SelectionBox"));
var v4_1 = tslib_1.__importDefault(require("uuid/v4"));
var Editor = /** @class */ (function (_super) {
    tslib_1.__extends(Editor, _super);
    function Editor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Editor.prototype.setEditorState = function (editorState) {
        if (this.props.onChange) {
            this.props.onChange(editorState);
        }
    };
    Editor.prototype.getEditorState = function () {
        return this.props.editorState;
    };
    Editor.prototype.onSelectionChange = function (nodes) {
        if (this.props.onChange) {
            this.props.onChange(this.getEditorState().set('document', this.getEditorState().document.updateNodes(nodes)));
        }
    };
    Editor.prototype.onNodeChange = function (node) {
        var newDocument = this.getEditorState().document.updateNode(node);
        var newState = this.getEditorState().set('document', newDocument);
        this.setEditorState(newState);
    };
    Editor.prototype.onSelect = function (id) {
        // Clear the selection box
        // Allow multiple selection when shift is pressed
        var newState = this.getEditorState().select(id, Boolean(this.props.shift));
        // Clear the previous selection box
        this.setEditorState(newState.set('selectionBox', null));
    };
    Editor.prototype.onDeselect = function () {
        // Allow multiple selection when shift is pressed
        if (!this.props.shift) {
            var newState = this.getEditorState().deselectAll();
            this.setEditorState(newState);
        }
    };
    Editor.prototype.getCursorPosition = function (e) {
        // Get the x and y position of the click relative to the editor element
        var rect = e.currentTarget.getBoundingClientRect();
        return new immutable_1.Vector({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };
    Editor.prototype.cursorOutsideSelection = function (e) {
        var cursorPosition = this.getCursorPosition(e);
        // Check if the click is outside the current selection
        // A 5 px buffer is added to accommodate the resize handles
        var editorState = this.getEditorState();
        if (!editorState.selectedIDs.isEmpty()) {
            var selectionBoundingBox = editorState.getSelectionBoundingBox();
            if (!(((cursorPosition.x >= selectionBoundingBox.getMinX() - 5) &&
                (cursorPosition.x <= (selectionBoundingBox.getMaxX() + 5))) &&
                ((cursorPosition.y >= selectionBoundingBox.getMinY() - 5) &&
                    (cursorPosition.y <= (selectionBoundingBox.getMaxY() + 5))))) {
                return true;
            }
            return false;
        }
        return true;
    };
    Editor.prototype.onMouseDown = function (e) {
        // Get the cursor position from the event
        var cursorPosition = this.getCursorPosition(e);
        if (!this.props.disableSelect && e.button === 0) {
            if (this.cursorOutsideSelection(e) && !this.props.shift) {
                // Create an empty selection box
                this.setEditorState(this.getEditorState().set('selectionBox', new immutable_1.SelectionBox({
                    startPos: cursorPosition,
                    cursorPos: cursorPosition
                })).deselectAll() // Deselect all nodes before allowing selection
                );
            }
        }
        // If this is a right click, save the position as the paste position
        if (e.button === 2) {
            this.setEditorState(this.getEditorState().set('pastePosition', cursorPosition));
        }
    };
    Editor.prototype.onMouseMove = function (e) {
        var e_1, _a;
        if (!this.props.disableSelect) {
            // Get the cursor position from the event
            var cursorPosition = this.getCursorPosition(e);
            if (this.getEditorState().selectionBox) {
                // Update the selection box cursor position on mouse move
                // Set the cursor position of the selection box.
                var newState = this.getEditorState().setIn(['selectionBox', 'cursorPos'], cursorPosition);
                if (!this.getEditorState().insertOnClick) {
                    try {
                        // Select nodes if they are inside the selection box
                        for (var _b = tslib_1.__values(newState.document.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var node = _c.value;
                            if (newState.selectionBox.includes(node)) {
                                newState = newState.select(node.id, true);
                            }
                            else {
                                newState = newState.deselect(node.id);
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                this.setEditorState(newState);
            }
        }
    };
    Editor.prototype.onMouseUp = function (e) {
        if (!this.props.disableSelect) {
            // Clear the selection box at the end of the selection
            if (this.getEditorState().selectionBox) {
                // Insert the new node
                if (this.getEditorState().insertOnClick) {
                    console.log('Insert');
                    var selectionBox = this.getEditorState().selectionBox;
                    // Generate a new ID for the node
                    var newId = v4_1.default();
                    // Set the properties of the new node
                    var newNode = this.getEditorState().insertOnClick
                        .set('id', newId)
                        .set('position', selectionBox.getPosition())
                        .set('size', selectionBox.getSize());
                    // Insert the new node at the click location
                    this.setEditorState(this.getEditorState()
                        .set('document', this.getEditorState()
                        .getDocument()
                        .addNode(newNode))
                        .set('insertOnClick', null)
                        .set('insertedId', newId)
                        .set('selectedIDs', immutable_2.List([newId]))
                        .set('selectionBox', null));
                }
                else {
                    // Clear the selection box
                    this.setEditorState(this.getEditorState().set('selectionBox', null));
                }
            }
        }
    };
    Editor.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement("div", { style: {
                width: this.getEditorState().document.width,
                height: this.getEditorState().document.height,
                backgroundColor: this.getEditorState().document.backgroundColor ? this.getEditorState().document.backgroundColor.toString() : undefined,
                position: 'relative',
                cursor: this.getEditorState().insertOnClick ? 'crosshair' : 'default',
                overflow: 'hidden'
            }, onMouseDown: function (e) { return _this.onMouseDown(e); }, onMouseMove: function (e) { return _this.onMouseMove(e); }, onMouseUp: function (e) { return _this.onMouseUp(e); } },
            this.getEditorState().document.nodes.reverse().map(function (node) { return (react_1.default.createElement(Node_1.default, { key: node.id, node: node, onSelect: function () { return _this.onSelect(node.id); }, onDeselect: function () { return _this.onDeselect(); }, selected: _this.getEditorState().selectedIDs.includes(node.id), onChange: function (node) { return _this.onNodeChange(node); }, readOnly: _this.props.readOnly, inGroup: _this.getEditorState().selectedIDs.includes(node.id) && _this.getEditorState().selectedIDs.count() > 1 })); }),
            this.getEditorState().selectedIDs.count() > 1 ? (react_1.default.createElement(Selection_1.default, { nodes: this.getEditorState().getSelectedNodes(), onChange: function (nodes) { return _this.onSelectionChange(nodes); } })) : null,
            this.getEditorState().selectionBox ?
                react_1.default.createElement(SelectionBox_1.default, { box: this.getEditorState().selectionBox, insertBox: Boolean(this.getEditorState().insertOnClick) })
                : null));
    };
    return Editor;
}(react_1.Component));
exports.default = Editor;
