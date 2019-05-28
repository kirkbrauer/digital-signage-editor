import React, { createRef } from 'react';
import NodeComponent from './NodeComponent';
import { Editor, RichUtils, EditorState, DraftInlineStyle } from 'draft-js';

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  }
};

const getStyleCSS = (style?: string): Object => {
  if (!style) return {};
  if (style.includes('FONT_SIZE_')) {
    return {
      fontSize: `${style.split('_')[2]}px`
    };
  }
  if (style.includes('COLOR_')) {
    const split = style.split('_')[2];
    return {
      color: `rgba(${split[1]},${split[2]},${split[3]},${split[4]})`
    };
  }
  return {};
};

const customStyleFn = (style: DraftInlineStyle) => {
  const cssStyles: Object[] = [];
  style.forEach((styleName) => {
    cssStyles.push(getStyleCSS(styleName));
  });
  return Object.assign({}, ...cssStyles);
};

export default class Text extends NodeComponent {

  private editorRef = createRef<Editor>();

  public renderEditableContent() {
    return this.renderContent();
  }

  public renderStaticContent() {
    return this.renderContent();
  }

  private handleKeyCommand(command: string, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      if (this.props.onChange) {
        const newNode = this.props.node.set('editorState', newState);
        this.props.onChange(newNode);
      }
      return 'handled';
    }
    return 'not-handled';
  }

  private renderContent() {
    return (
      <>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          margin: 8,
          zIndex: 10,
          minWidth: 'calc(100% - 16px)',
          cursor: 'text'
        }}
          onMouseDown={(e) => { e.stopPropagation(); }}
        >
          <Editor
            ref={this.editorRef}
            customStyleMap={styleMap}
            customStyleFn={customStyleFn}
            editorState={this.props.node.editorState!}
            readOnly={this.props.readOnly}
            onFocus={() => {
              // Select the node when the text editor is focused
              this.props.onSelect && this.props.onSelect();
            }}
            handleKeyCommand={(command, state) => this.handleKeyCommand(command, state)}
            onChange={(editorState) => {
              if (this.props.onChange) {
                const newNode = this.props.node.set('editorState', editorState);
                this.props.onChange(newNode);
              }
            }}
          />
        </div>
        <div
          style={this.props.node.toCSS(true)}
        />
      </>
    );
  }

}
