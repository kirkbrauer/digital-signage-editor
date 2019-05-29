"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var immutable_1 = require("./model/immutable");
var draft_js_1 = require("draft-js");
var immutable_2 = require("immutable");
/**
 * A class of utility functions for manipulating the editor state.
 */
var EditorUtils = /** @class */ (function () {
    function EditorUtils() {
    }
    /**
     * Returns the DraftJS style for a font size.
     * @param size The font size in px.
     */
    EditorUtils.getFontSizeStyle = function (size) {
        return "FONT_SIZE_" + size;
    };
    /**
     * Returns the DraftJS style for a color.
     * @param color The immutable color object.
     */
    EditorUtils.getColorStyle = function (color) {
        return "COLOR_" + color.red + "_" + color.green + "_" + color.blue + "_" + color.alpha;
    };
    /**
     * Returns the DraftJS style for a font.
     * @param font The font name.
     */
    EditorUtils.getFontStyle = function (font) {
        return "FONT_FAMILY_" + font;
    };
    /**
     * Returns the font sizes of the current text selection.
     * @param editorState The immutable editor state.
     */
    EditorUtils.getSelectedFontSizes = function (editorState) {
        var fontSizes = [];
        var textEditorState = editorState.getSelectedTextEditorState();
        if (!textEditorState)
            return [];
        var inlineStyles = textEditorState.getCurrentInlineStyle();
        inlineStyles.forEach(function (style) {
            if (style) {
                if (style.includes('FONT_SIZE_')) {
                    fontSizes.push(style.split('_')[2] * 1);
                }
            }
        });
        // If there are no font sizes, return the default, 14
        if (fontSizes.length === 0)
            return [14];
        return fontSizes;
    };
    /**
     * Sets the font size of the current text selection.
     * @param editorState The immutable editor state.
     * @param size The new font size.
     */
    EditorUtils.setSelectedFontSize = function (editorState, size) {
        var e_1, _a;
        var textEditorState = editorState.getSelectedTextEditorState();
        if (!textEditorState)
            return editorState;
        var newContentState = textEditorState.getCurrentContent();
        var currentSelection = textEditorState.getSelection();
        // Get the existing font sizes
        var oldFontSizes = EditorUtils.getSelectedFontSizes(editorState);
        try {
            // Remove the existing font size styles
            for (var oldFontSizes_1 = tslib_1.__values(oldFontSizes), oldFontSizes_1_1 = oldFontSizes_1.next(); !oldFontSizes_1_1.done; oldFontSizes_1_1 = oldFontSizes_1.next()) {
                var oldSize = oldFontSizes_1_1.value;
                newContentState = draft_js_1.Modifier.removeInlineStyle(newContentState, currentSelection, EditorUtils.getFontSizeStyle(oldSize));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (oldFontSizes_1_1 && !oldFontSizes_1_1.done && (_a = oldFontSizes_1.return)) _a.call(oldFontSizes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Set the new font size
        newContentState = draft_js_1.Modifier.applyInlineStyle(newContentState, currentSelection, EditorUtils.getFontSizeStyle(size));
        // Push the changes to the stack
        textEditorState = draft_js_1.EditorState.push(textEditorState, newContentState, 'change-inline-style');
        // Update the text editor state
        return editorState.setSelectedTextEditorState(textEditorState);
    };
    /**
     * Returns the text colors of the current text selection.
     * @param editorState The immutable editor state.
     */
    EditorUtils.getSelectedTextColors = function (editorState) {
        var textColors = [];
        var textEditorState = editorState.getSelectedTextEditorState();
        if (!textEditorState)
            return [];
        var inlineStyles = textEditorState.getCurrentInlineStyle();
        inlineStyles.forEach(function (style) {
            if (style) {
                if (style.includes('COLOR_')) {
                    var split = style.split('_');
                    textColors.push(new immutable_1.Color({
                        red: split[1] * 1,
                        green: split[2] * 1,
                        blue: split[3] * 1,
                        alpha: split[4] * 1
                    }));
                }
            }
        });
        return textColors;
    };
    /**
     * Sets the text color of the current text selection.
     * @param editorState The immutable editor state.
     * @param color The immutable color object.
     */
    EditorUtils.setSelectedTextColor = function (editorState, color) {
        var e_2, _a;
        var textEditorState = editorState.getSelectedTextEditorState();
        if (!textEditorState)
            return editorState;
        var newContentState = textEditorState.getCurrentContent();
        var currentSelection = textEditorState.getSelection();
        // Get the existing text colors
        var oldColors = EditorUtils.getSelectedTextColors(editorState);
        try {
            // Remove the existing color styles
            for (var oldColors_1 = tslib_1.__values(oldColors), oldColors_1_1 = oldColors_1.next(); !oldColors_1_1.done; oldColors_1_1 = oldColors_1.next()) {
                var oldColor = oldColors_1_1.value;
                newContentState = draft_js_1.Modifier.removeInlineStyle(newContentState, currentSelection, EditorUtils.getColorStyle(oldColor));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (oldColors_1_1 && !oldColors_1_1.done && (_a = oldColors_1.return)) _a.call(oldColors_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // Set the new color
        newContentState = draft_js_1.Modifier.applyInlineStyle(newContentState, currentSelection, EditorUtils.getColorStyle(color));
        // Push the changes to the stack
        textEditorState = draft_js_1.EditorState.push(textEditorState, newContentState, 'change-inline-style');
        // Update the text editor state
        return editorState.setSelectedTextEditorState(textEditorState);
    };
    /**
     * Returns the fonts of the current text selection.
     * @param editorState The immutable editor state.
     */
    EditorUtils.getSelectedFonts = function (editorState) {
        var fonts = [];
        var textEditorState = editorState.getSelectedTextEditorState();
        if (!textEditorState)
            return [];
        var inlineStyles = textEditorState.getCurrentInlineStyle();
        inlineStyles.forEach(function (style) {
            if (style) {
                if (style.includes('FONT_FAMILY_')) {
                    fonts.push(style.split('_')[2]);
                }
            }
        });
        // If there are no fonts, return the default, Arial
        if (fonts.length === 0)
            return ['Arial'];
        return fonts;
    };
    /**
     * Sets the font of the current text selection.
     * @param editorState The immutable editor state.
     * @param font The new font name.
     */
    EditorUtils.setSelectedFont = function (editorState, font) {
        var e_3, _a;
        var textEditorState = editorState.getSelectedTextEditorState();
        if (!textEditorState)
            return editorState;
        var newContentState = textEditorState.getCurrentContent();
        var currentSelection = textEditorState.getSelection();
        // Get the existing font
        var oldFonts = EditorUtils.getSelectedFonts(editorState);
        try {
            // Remove the existing font styles
            for (var oldFonts_1 = tslib_1.__values(oldFonts), oldFonts_1_1 = oldFonts_1.next(); !oldFonts_1_1.done; oldFonts_1_1 = oldFonts_1.next()) {
                var oldFont = oldFonts_1_1.value;
                newContentState = draft_js_1.Modifier.removeInlineStyle(newContentState, currentSelection, EditorUtils.getFontStyle(oldFont));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (oldFonts_1_1 && !oldFonts_1_1.done && (_a = oldFonts_1.return)) _a.call(oldFonts_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        // Set the new font
        newContentState = draft_js_1.Modifier.applyInlineStyle(newContentState, currentSelection, EditorUtils.getFontStyle(font));
        // Push the changes to the stack
        textEditorState = draft_js_1.EditorState.push(textEditorState, newContentState, 'change-inline-style');
        // Update the text editor state
        return editorState.setSelectedTextEditorState(textEditorState);
    };
    /**
     * Returns the fill colors of the current selection.
     * @param editorState The immutable editor state.
     */
    EditorUtils.getSelectedFillColors = function (editorState) {
        var e_4, _a;
        var colors = [];
        var selectedNodes = editorState.getSelectedNodes();
        try {
            for (var selectedNodes_1 = tslib_1.__values(selectedNodes), selectedNodes_1_1 = selectedNodes_1.next(); !selectedNodes_1_1.done; selectedNodes_1_1 = selectedNodes_1.next()) {
                var node = selectedNodes_1_1.value;
                if (node.fill) {
                    if (node.fill.color) {
                        colors.push(node.fill.color);
                    }
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (selectedNodes_1_1 && !selectedNodes_1_1.done && (_a = selectedNodes_1.return)) _a.call(selectedNodes_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        if (colors.length === 0)
            return [new immutable_1.Color()];
        return colors;
    };
    /**
     * Sets the fill color of the current selection.
     * @param editorState The immutable editor state.
     * @param color The new RGB color.
     */
    EditorUtils.setSelectedFillColor = function (editorState, color) {
        var e_5, _a;
        var newNodes = [];
        var selectedNodes = editorState.getSelectedNodes();
        try {
            for (var selectedNodes_2 = tslib_1.__values(selectedNodes), selectedNodes_2_1 = selectedNodes_2.next(); !selectedNodes_2_1.done; selectedNodes_2_1 = selectedNodes_2.next()) {
                var node = selectedNodes_2_1.value;
                if (node.fill) {
                    newNodes.push(node.setIn(['fill', 'color'], color));
                }
                else {
                    var newFill = new immutable_1.Fill({
                        color: color,
                        visible: true
                    });
                    newNodes.push(node.set('fill', newFill));
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (selectedNodes_2_1 && !selectedNodes_2_1.done && (_a = selectedNodes_2.return)) _a.call(selectedNodes_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return editorState.set('document', editorState.getDocument().updateNodes(immutable_2.List(newNodes)));
    };
    return EditorUtils;
}());
exports.EditorUtils = EditorUtils;
