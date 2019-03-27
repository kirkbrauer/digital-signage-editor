import * as tslib_1 from "tslib";
import { EditorState } from 'draft-js';
import { ShapeNode } from './ShapeNode';
/**
 * A text node.
 */
var TextNode = /** @class */ (function (_super) {
    tslib_1.__extends(TextNode, _super);
    function TextNode(config) {
        var _this = _super.call(this, config) || this;
        _this.editorState = config.editorState || EditorState.createEmpty();
        return _this;
    }
    /**
     * Returns the DraftJS editor state.
     */
    TextNode.prototype.getEditorState = function () {
        return this.editorState;
    };
    /**
     * Sets the DraftJS editor state.
     * @param editorState The new editor state.
     */
    TextNode.prototype.setEditorState = function (editorState) {
        return this.cloneWith({
            editorState: editorState
        });
    };
    TextNode.prototype.toJS = function () {
        return tslib_1.__assign({}, _super.prototype.toJS.call(this), { editorState: this.editorState });
    };
    TextNode.prototype.toRaw = function () { };
    return TextNode;
}(ShapeNode));
export { TextNode };
