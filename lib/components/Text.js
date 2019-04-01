import * as tslib_1 from "tslib";
import React, { createRef } from 'react';
import NodeComponent from './NodeComponent';
import { Editor } from 'draft-js';
var Text = /** @class */ (function (_super) {
    tslib_1.__extends(Text, _super);
    function Text() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editorRef = createRef();
        return _this;
    }
    Text.prototype.componentDidMount = function () {
        // Focus the editor if the user enters edit mode
        if (this.props.editing) {
            this.editorRef.current.focus();
        }
    };
    Text.prototype.renderEditableContent = function () {
        return this.renderContent(true);
    };
    Text.prototype.renderStaticContent = function () {
        return this.renderContent(false);
    };
    Text.prototype.renderContent = function (editing) {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    margin: 8,
                    zIndex: 10,
                    minWidth: 'calc(100% - 16px)',
                    cursor: 'text'
                } },
                React.createElement(Editor, { ref: this.editorRef, editorState: this.props.node.editorState, onFocus: function () {
                        if (_this.dragging) {
                            // Prevent selection while dragging
                            _this.editorRef.current.blur();
                        }
                        else {
                            // Start editing if the user clicks without dragging
                            if (_this.props.onStartEditing) {
                                _this.props.onStartEditing();
                            }
                        }
                    }, onBlur: function () {
                        // Stop editing if the editor loses focus
                        if (_this.props.onStopEditing && editing) {
                            _this.props.onStopEditing();
                        }
                    }, onChange: function (editorState) {
                        if (_this.props.onChange) {
                            var newNode = _this.props.node.set('editorState', editorState);
                            _this.props.onChange(newNode);
                        }
                    } })),
            React.createElement("div", { style: this.props.node.toCSS() })));
    };
    return Text;
}(NodeComponent));
export default Text;
