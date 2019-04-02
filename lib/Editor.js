import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import Node from './components/Node';
import Selection from './components/Selection';
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
        // Allow multiple selection when shift is pressed
        var newState = this.getEditorState().select(id, Boolean(this.props.shift));
        // Stop editing the node when another node is selected
        this.setEditorState(newState.set('editing', null));
    };
    Editor.prototype.onStartEditing = function (id) {
        var newState = this.getEditorState().set('editing', id);
        this.setEditorState(newState);
    };
    Editor.prototype.onStopEditing = function () {
        var newState = this.getEditorState().set('editing', null);
        this.setEditorState(newState);
    };
    Editor.prototype.onDeselect = function () {
        // Allow multiple selection when shift is pressed
        if (!this.props.shift) {
            var newState = this.getEditorState().deselectAll().set('editing', null);
            this.setEditorState(newState);
        }
    };
    Editor.prototype.onEditorClick = function (e) {
        // Get the x and y position of the click relative to the editor element
        var rect = e.currentTarget.getBoundingClientRect();
        var xPos = e.clientX - rect.left;
        var yPos = e.clientY - rect.top;
        // Check if the click is outside the current selection
        // A 5 px buffer is added to accommodate the resize handles
        var editorState = this.getEditorState();
        if (editorState.selectedIDs.count() > 0) {
            if (!(((xPos >= editorState.getSelectionX() - 5) &&
                (xPos <= (editorState.getSelectionX() + editorState.getSelectionWidth() + 5))) &&
                ((yPos >= editorState.getSelectionY() - 5) &&
                    (yPos <= (editorState.getSelectionY() + editorState.getSelectionHeight() + 5))))) {
                // Deselect all nodes
                this.setEditorState(editorState.deselectAll().set('editing', null));
            }
        }
    };
    Editor.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { style: {
                width: this.getEditorState().document.width,
                height: this.getEditorState().document.height,
                position: 'relative'
            }, onClick: function (e) { return _this.onEditorClick(e); } },
            this.getEditorState().document.nodes.reverse().filterNot(function (node) {
                return _this.getEditorState().editing === node.id;
            }).map(function (node) {
                return (React.createElement(Node, { key: node.id, node: node, onSelect: function () { return _this.onSelect(node.id); }, onStartEditing: function () { return _this.onStartEditing(node.id); }, onStopEditing: function () { return _this.onStopEditing(); }, onDeselect: function () { return _this.onDeselect(); }, selected: _this.getEditorState().selectedIDs.includes(node.id), editing: false, onChange: function (node) { return _this.onNodeChange(node); }, readOnly: _this.props.readOnly || (_this.getEditorState().selectedIDs.includes(node.id) && _this.getEditorState().selectedIDs.count() > 1) }));
            }),
            this.getEditorState().getEditNode() ? (React.createElement(Node, { key: this.getEditorState().getEditNode().id, node: this.getEditorState().getEditNode(), onDeselect: function () { return _this.onDeselect(); }, onChange: function (node) { return _this.onNodeChange(node); }, editing: true, selected: true })) : null,
            this.getEditorState().selectedIDs.count() > 1 ? (React.createElement(Selection, { nodes: this.getEditorState().getSelectedNodes(), onChange: function (nodes) { return _this.onSelectionChange(nodes); } })) : null));
    };
    return Editor;
}(Component));
export default Editor;
