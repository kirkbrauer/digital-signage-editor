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
    Text.prototype.renderEditableContent = function () {
        return this.renderContent();
    };
    Text.prototype.renderStaticContent = function () {
        return this.renderContent();
    };
    Text.prototype.renderContent = function () {
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
                }, onMouseDown: function (e) { e.stopPropagation(); } },
                React.createElement(Editor, { ref: this.editorRef, editorState: this.props.node.editorState, readOnly: this.props.readOnly, onFocus: function () {
                        // Select the node when the text editor is focused
                        _this.props.onSelect && _this.props.onSelect();
                    }, onChange: function (editorState) {
                        if (_this.props.onChange) {
                            var newNode = _this.props.node.set('editorState', editorState);
                            _this.props.onChange(newNode);
                        }
                    } })),
            React.createElement("div", { style: this.props.node.toCSS(true) })));
    };
    return Text;
}(NodeComponent));
export default Text;
