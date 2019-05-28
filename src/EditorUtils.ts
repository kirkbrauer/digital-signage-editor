import { EditorState, Color } from './model/immutable';
import { EditorState as DraftJsEditorState, Modifier } from 'draft-js';

/**
 * A class of utility functions for manipulating the editor state.
 */
export class EditorUtils {

  /**
   * Returns the DraftJS style for a font size.
   * @param size The font size in px.
   */
  public static getFontSizeStyle(size: number): string {
    return `FONT_SIZE_${size}`;
  }

  /**
   * Returns the DraftJS style for a color.
   * @param color The immutable color object.
   */
  public static getColorStyle(color: Color): string {
    return `COLOR_${color.red}_${color.green}_${color.blue}_${color.alpha}`;
  }

  /**
   * Returns the font sizes of the current text selection.
   * @param editorState The immutable editor state.
   */
  public static getSelectedFontSizes(editorState: EditorState): number[] {
    const fontSizes: number[] = [];
    const textEditorState = editorState.getSelectedTextEditorState();
    if (!textEditorState) return [];
    const inlineStyles = textEditorState.getCurrentInlineStyle();
    inlineStyles.forEach((style) => {
      if (style) {
        if (style.includes('FONT_SIZE_')) {
          fontSizes.push(style.split('_')[2] as any * 1);
        }
      }
    });
    // If there are no font sizes, return the default, 14
    if (fontSizes.length === 0) return [14];
    return fontSizes;
  }

  /**
   * Sets the font size of the current text selection.
   * @param editorState The immutable editor state.
   * @param size The new font size.
   */
  public static setSelectedFontSize(editorState: EditorState, size: number): EditorState {
    let textEditorState = editorState.getSelectedTextEditorState();
    if (!textEditorState) return editorState;
    let newContentState = textEditorState.getCurrentContent();
    const currentSelection = textEditorState.getSelection();
    // Get the existing font sizes
    const oldFontSizes = EditorUtils.getSelectedFontSizes(editorState);
    // Remove the existing font size styles
    for (const oldSize of oldFontSizes) {
      newContentState = Modifier.removeInlineStyle(
        newContentState, 
        currentSelection,
        EditorUtils.getFontSizeStyle(oldSize)
      );
    }
    // Set the new font size
    newContentState = Modifier.applyInlineStyle(
      newContentState, 
      currentSelection,
      EditorUtils.getFontSizeStyle(size)
    );
    // Push the changes to the stack
    textEditorState = DraftJsEditorState.push(
      textEditorState,
      newContentState,
      'change-inline-style'
    );
    // Update the text editor state
    return editorState.setSelectedTextEditorState(
      textEditorState
    );
  }

  /**
   * Returns the text colors of the current text selection.
   * @param editorState The immutable editor state.
   */
  public static getSelectedTextColors(editorState: EditorState): Color[] {
    const textColors: Color[] = [];
    const textEditorState = editorState.getSelectedTextEditorState();
    if (!textEditorState) return [];
    const inlineStyles = textEditorState.getCurrentInlineStyle();
    inlineStyles.forEach((style) => {
      if (style) {
        if (style.includes('COLOR_')) {
          const split = style.split('_');
          textColors.push(
            new Color({
              red: split[1] as any * 1,
              green: split[2] as any * 1,
              blue: split[3] as any * 1,
              alpha: split[4] as any * 1
            })
          );
        }
      }
    });
    return textColors;
  }

  /**
   * Sets the text color of the current text selection.
   * @param editorState The immutable editor state.
   * @param color The immutable color object.
   */
  public static setSelectedTextColor(editorState: EditorState, color: Color): EditorState {
    let textEditorState = editorState.getSelectedTextEditorState();
    if (!textEditorState) return editorState;
    let newContentState = textEditorState.getCurrentContent();
    const currentSelection = textEditorState.getSelection();
    // Get the existing text colors
    const oldColors = EditorUtils.getSelectedTextColors(editorState);
    // Remove the existing color styles
    for (const oldColor of oldColors) {
      newContentState = Modifier.removeInlineStyle(
        newContentState, 
        currentSelection,
        EditorUtils.getColorStyle(oldColor)
      );
    }
    // Set the new color
    newContentState = Modifier.applyInlineStyle(
      newContentState, 
      currentSelection,
      EditorUtils.getColorStyle(color)
    );
    // Push the changes to the stack
    textEditorState = DraftJsEditorState.push(
      textEditorState,
      newContentState,
      'change-inline-style'
    );
    // Update the text editor state
    return editorState.setSelectedTextEditorState(
      textEditorState
    );
  }

}
