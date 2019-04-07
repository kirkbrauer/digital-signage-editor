import React, { createRef } from 'react';
import NodeComponent from './NodeComponent';
import { Editor } from 'draft-js';

export default class Text extends NodeComponent {

  private editorRef = createRef<Editor>();

  public renderEditableContent() {
    return this.renderContent();
  }

  public renderStaticContent() {
    return this.renderContent();
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
            editorState={this.props.node.editorState!}
            readOnly={this.props.readOnly}
            onFocus={() => {
              // Select the node when the text editor is focused
              this.props.onSelect && this.props.onSelect();
            }}
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
