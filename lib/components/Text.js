"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var NodeComponent_1 = tslib_1.__importDefault(require("./NodeComponent"));
var draft_js_1 = require("draft-js");
var Text = /** @class */ (function (_super) {
    tslib_1.__extends(Text, _super);
    function Text() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editorRef = react_1.createRef();
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
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    margin: 8,
                    zIndex: 10,
                    minWidth: 'calc(100% - 16px)',
                    cursor: 'text'
                }, onMouseDown: function (e) { e.stopPropagation(); } },
                react_1.default.createElement(draft_js_1.Editor, { ref: this.editorRef, editorState: this.props.node.editorState, readOnly: this.props.readOnly, onFocus: function () {
                        // Select the node when the text editor is focused
                        _this.props.onSelect && _this.props.onSelect();
                    }, onChange: function (editorState) {
                        if (_this.props.onChange) {
                            var newNode = _this.props.node.set('editorState', editorState);
                            _this.props.onChange(newNode);
                        }
                    } })),
            react_1.default.createElement("div", { style: this.props.node.toCSS(true) })));
    };
    return Text;
}(NodeComponent_1.default));
exports.default = Text;
