import { EditorState, Color } from './model/immutable';
/**
 * A class of utility functions for manipulating the editor state.
 */
export declare class EditorUtils {
    /**
     * Returns the DraftJS style for a font size.
     * @param size The font size in px.
     */
    static getFontSizeStyle(size: number): string;
    /**
     * Returns the DraftJS style for a color.
     * @param color The immutable color object.
     */
    static getColorStyle(color: Color): string;
    /**
     * Returns the DraftJS style for a font.
     * @param font The font name.
     */
    static getFontStyle(font: string): string;
    /**
     * Returns the font sizes of the current text selection.
     * @param editorState The immutable editor state.
     */
    static getSelectedFontSizes(editorState: EditorState): number[];
    /**
     * Sets the font size of the current text selection.
     * @param editorState The immutable editor state.
     * @param size The new font size.
     */
    static setSelectedFontSize(editorState: EditorState, size: number): EditorState;
    /**
     * Returns the text colors of the current text selection.
     * @param editorState The immutable editor state.
     */
    static getSelectedTextColors(editorState: EditorState): Color[];
    /**
     * Sets the text color of the current text selection.
     * @param editorState The immutable editor state.
     * @param color The immutable color object.
     */
    static setSelectedTextColor(editorState: EditorState, color: Color): EditorState;
    /**
     * Returns the fonts of the current text selection.
     * @param editorState The immutable editor state.
     */
    static getSelectedFonts(editorState: EditorState): string[];
    /**
     * Sets the font of the current text selection.
     * @param editorState The immutable editor state.
     * @param font The new font name.
     */
    static setSelectedFont(editorState: EditorState, font: string): EditorState;
}
