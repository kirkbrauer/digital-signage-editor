"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var NodeComponent_1 = tslib_1.__importDefault(require("./NodeComponent"));
var draft_js_1 = require("draft-js");
var styleMap = {
    STRIKETHROUGH: {
        textDecoration: 'line-through',
    }
};
var getStyleCSS = function (style) {
    if (!style)
        return {};
    if (style.includes('FONT_SIZE_')) {
        return {
            fontSize: style.split('_')[2] + "px"
        };
    }
    if (style.includes('FONT_FAMILY_')) {
        return {
            fontFamily: style.split('_')[2]
        };
    }
    if (style.includes('COLOR_')) {
        var split = style.split('_');
        return {
            color: "rgba(" + split[1] + "," + split[2] + "," + split[3] + "," + split[4] + ")"
        };
    }
    return {};
};
var customStyleFn = function (style) {
    var cssStyles = [];
    style.forEach(function (styleName) {
        cssStyles.push(getStyleCSS(styleName));
    });
    return Object.assign.apply(Object, tslib_1.__spread([{}], cssStyles));
};
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
    Text.prototype.handleKeyCommand = function (command, editorState) {
        var newState = draft_js_1.RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            if (this.props.onChange) {
                var newNode = this.props.node.set('editorState', newState);
                this.props.onChange(newNode);
            }
            return 'handled';
        }
        return 'not-handled';
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
                react_1.default.createElement(draft_js_1.Editor, { ref: this.editorRef, customStyleMap: styleMap, customStyleFn: customStyleFn, editorState: this.props.node.editorState, readOnly: this.props.readOnly, onFocus: function () {
                        // Select the node when the text editor is focused
                        _this.props.onSelect && _this.props.onSelect();
                    }, handleKeyCommand: function (command, state) { return _this.handleKeyCommand(command, state); }, onChange: function (editorState) {
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
