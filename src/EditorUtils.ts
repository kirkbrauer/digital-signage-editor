import { EditorState, Color, Node, Fill } from './model/immutable';
import { EditorState as DraftJsEditorState, Modifier } from 'draft-js';
import { List } from 'immutable';

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
   * Returns the DraftJS style for a font.
   * @param font The font name.
   */
  public static getFontStyle(font: string): string {
    return `FONT_FAMILY_${font}`;
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

  /**
   * Returns the fonts of the current text selection.
   * @param editorState The immutable editor state.
   */
  public static getSelectedFonts(editorState: EditorState): string[] {
    const fonts: string[] = [];
    const textEditorState = editorState.getSelectedTextEditorState();
    if (!textEditorState) return [];
    const inlineStyles = textEditorState.getCurrentInlineStyle();
    inlineStyles.forEach((style) => {
      if (style) {
        if (style.includes('FONT_FAMILY_')) {
          fonts.push(style.split('_')[2]);
        }
      }
    });
    // If there are no fonts, return the default, Arial
    if (fonts.length === 0) return ['Arial'];
    return fonts;
  }

  /**
   * Sets the font of the current text selection.
   * @param editorState The immutable editor state.
   * @param font The new font name.
   */
  public static setSelectedFont(editorState: EditorState, font: string): EditorState {
    let textEditorState = editorState.getSelectedTextEditorState();
    if (!textEditorState) return editorState;
    let newContentState = textEditorState.getCurrentContent();
    const currentSelection = textEditorState.getSelection();
    // Get the existing font
    const oldFonts = EditorUtils.getSelectedFonts(editorState);
    // Remove the existing font styles
    for (const oldFont of oldFonts) {
      newContentState = Modifier.removeInlineStyle(
        newContentState, 
        currentSelection,
        EditorUtils.getFontStyle(oldFont)
      );
    }
    // Set the new font
    newContentState = Modifier.applyInlineStyle(
      newContentState, 
      currentSelection,
      EditorUtils.getFontStyle(font)
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
   * Returns the fill colors of the current selection.
   * @param editorState The immutable editor state.
   */
  public static getSelectedFillColors(editorState: EditorState): Color[] {
    const colors: Color[] = [];
    const selectedNodes = editorState.getSelectedNodes();
    for (const node of selectedNodes) {
      if (node.fill) {
        if (node.fill.color) {
          colors.push(node.fill.color);
        }
      }
    }
    if (colors.length === 0) return [new Color()];
    return colors;
  }

  /**
   * Sets the fill color of the current selection.
   * @param editorState The immutable editor state.
   * @param color The new RGB color.
   */
  public static setSelectedFillColor(editorState: EditorState, color: Color): EditorState {
    const newNodes: Node[] = [];
    const selectedNodes = editorState.getSelectedNodes();
    for (const node of selectedNodes) {
      if (node.fill) {
        newNodes.push(node.setIn(['fill', 'color'], color));
      } else {
        const newFill = new Fill({
          color,
          visible: true
        });
        newNodes.push(node.set('fill', newFill));
      }
    }
    return editorState.set('document', editorState.getDocument().updateNodes(List(newNodes)));
  }

}
