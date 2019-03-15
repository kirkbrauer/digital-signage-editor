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
            var newState = this.props.editorState.setSelectionGroup(node);
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
            this.props.onChange(newState);
        }
    };
    Editor.prototype.onDeselect = function () {
        if (this.props.onChange) {
            // Allow multiple selection when shift is pressed
            if (!this.state.keysPressed.includes('Shift')) {
                var newState = this.props.editorState.deselectAll();
                this.props.onChange(newState);
            }
        }
    };
    Editor.prototype.render = function () {
        var _this = this;
        var selectionGroup = this.props.editorState.getSelectionGroup();
        return (React.createElement("div", { style: {
                width: this.props.editorState.getDocument().getWidth(),
                height: this.props.editorState.getDocument().getHeight(),
                position: 'relative'
            } },
            this.props.editorState.getSelectionGroup() ? (React.createElement(Group, { key: selectionGroup.getID(), node: selectionGroup, selected: true, onDeselect: function () { return _this.onDeselect(); }, onChange: function (node) { return _this.onSelectionGroupNodeChange(node); } })) : null,
            this.props.editorState.getDocument().getNodes().map(function (node) {
                // Only render the node if it isn't in the selection group
                if (_this.props.editorState.getSelectedIds().length > 1) {
                    if (_this.props.editorState.getSelectedIds().includes(node.getID())) {
                        return null;
                    }
                }
                return (React.createElement(Node, { key: node.getID(), node: node, onSelect: function () { return _this.onSelect(node.getID()); }, onDeselect: function () { return _this.onDeselect(); }, selected: _this.props.editorState.getSelectedIds().includes(node.getID()), onChange: function (node) { return _this.onNodeChange(node); } }));
            })));
    };
    return Editor;
}(Component));
export default Editor;
