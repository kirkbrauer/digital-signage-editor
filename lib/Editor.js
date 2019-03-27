import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import Node from './components/Node';
import Group from './components/Group';
var Editor = /** @class */ (function (_super) {
    tslib_1.__extends(Editor, _super);
    function Editor(props) {
        var _this = _super.call(this, props) || this;
        _this.keyDownListener = function (e) { return _this.onKeyDown(e); };
        _this.keyUpListener = function (e) { return _this.onKeyUp(e); };
        _this.state = {
            keysPressed: []
        };
        return _this;
    }
    Editor.prototype.onKeyDown = function (e) {
        this.setState({ keysPressed: this.state.keysPressed.concat([e.key]) });
    };
    Editor.prototype.onKeyUp = function (e) {
        var keysPressed = this.state.keysPressed;
        if (keysPressed.includes(e.key)) {
            keysPressed.splice(keysPressed.indexOf(e.key));
        }
        this.setState({ keysPressed: keysPressed });
    };
    Editor.prototype.componentDidMount = function () {
        document.addEventListener('keydown', this.keyDownListener);
        document.addEventListener('keyup', this.keyUpListener);
    };
    Editor.prototype.componentWillUnmount = function () {
        document.removeEventListener('keydown', this.keyDownListener);
        document.removeEventListener('keyup', this.keyUpListener);
    };
    Editor.prototype.onSelectionGroupNodeChange = function (node) {
        if (this.props.onChange) {
            var newState = this.props.editorState.updateSelectionGroup(node);
            this.props.onChange(newState);
        }
    };
    Editor.prototype.onNodeChange = function (node) {
        if (this.props.onChange) {
            var newDocument = this.props.editorState.getDocument().updateNode(node);
            var newState = this.props.editorState.setDocument(newDocument);
            this.props.onChange(newState);
        }
    };
    Editor.prototype.onSelect = function (id) {
        if (this.props.onChange) {
            // Allow multiple selection when shift is pressed
            var newState = this.props.editorState.select(id, this.state.keysPressed.includes('Shift'));
            // Stop editing the node when another node is selected
            this.props.onChange(newState.stopEditing());
        }
    };
    Editor.prototype.onStartEditing = function (id) {
        if (this.props.onChange) {
            var newState = this.props.editorState.edit(id);
            this.props.onChange(newState);
        }
    };
    Editor.prototype.onStopEditing = function () {
        if (this.props.onChange) {
            var newState = this.props.editorState.stopEditing();
            this.props.onChange(newState);
        }
    };
    Editor.prototype.onDeselect = function () {
        if (this.props.onChange) {
            // Allow multiple selection when shift is pressed
            if (!this.state.keysPressed.includes('Shift')) {
                var newState = this.props.editorState.deselectAll().stopEditing();
                this.props.onChange(newState);
            }
        }
    };
    Editor.prototype.onEditorClick = function (e) {
        // Get the x and y position of the click relative to the editor element
        var rect = e.currentTarget.getBoundingClientRect();
        var xPos = e.clientX - rect.left;
        var yPos = e.clientY - rect.top;
        // Check if the click is outside the current selection
        // A 5 px buffer is added to accommodate the resize handles
        var editorState = this.props.editorState;
        if (!(((xPos >= editorState.getSelectionXPos() - 5) &&
            (xPos <= (editorState.getSelectionXPos() + editorState.getSelectionWidth() + 5))) &&
            ((yPos >= editorState.getSelectionYPos() - 5) &&
                (yPos <= (editorState.getSelectionYPos() + editorState.getSelectionHeight() + 5))))) {
            if (this.props.onChange) {
                this.props.onChange(editorState.deselectAll());
            }
        }
    };
    Editor.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { style: {
                width: this.props.editorState.getDocument().getWidth(),
                height: this.props.editorState.getDocument().getHeight(),
                position: 'relative'
            }, onClick: function (e) { return _this.onEditorClick(e); } },
            this.props.editorState.getEditNode() ? (React.createElement(Node, { key: this.props.editorState.getEditNode().getID(), node: this.props.editorState.getEditNode(), onDeselect: function () { return _this.onDeselect(); }, onChange: function (node) { return _this.onNodeChange(node); }, editing: true, selected: true })) : null,
            this.props.editorState.getSelectionGroup() ? (React.createElement(Group, { key: this.props.editorState.getSelectionGroup().getID(), node: this.props.editorState.getSelectionGroup(), selected: true, editing: false, onDeselect: function () { return _this.onDeselect(); }, onChange: function (node) { return _this.onSelectionGroupNodeChange(node); } })) : null,
            this.props.editorState.getDocument().getNodes().map(function (node) {
                // Only render the node if it isn't in the selection group or being edited
                if (_this.props.editorState.getEditId() === node.getID()) {
                    return null;
                }
                if (_this.props.editorState.getSelectedIds().length > 1) {
                    if (_this.props.editorState.getSelectedIds().includes(node.getID())) {
                        return null;
                    }
                }
                return (React.createElement(Node, { key: node.getID(), node: node, onSelect: function () { return _this.onSelect(node.getID()); }, onStartEditing: function () { return _this.onStartEditing(node.getID()); }, onStopEditing: function () { return _this.onStopEditing(); }, onDeselect: function () { return _this.onDeselect(); }, selected: _this.props.editorState.getSelectedIds().includes(node.getID()), editing: false, onChange: function (node) { return _this.onNodeChange(node); } }));
            })));
    };
    return Editor;
}(Component));
export default Editor;
