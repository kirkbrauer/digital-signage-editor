import React, { createRef } from 'react';
import NodeComponent from './NodeComponent';
import { Editor } from 'draft-js';

export default class Text extends NodeComponent {

  private editorRef = createRef<Editor>();

  componentDidMount() {
    // Focus the editor if the user enters edit mode
    if (this.props.editing) {
      this.editorRef.current!.focus();
    }
  }

  public renderEditableContent() {
    return this.renderContent(true);
  }

  public renderStaticContent() {
    return this.renderContent(false);
  }

  private renderContent(editing: boolean) {
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
        }}>
          <Editor
            ref={this.editorRef}
            editorState={this.props.node.editorState!}
            readOnly={this.props.readOnly}
            onFocus={() => {
              if (this.dragging) {
                // Prevent selection while dragging
                this.editorRef.current!.blur();
              } else {
                // Start editing if the user clicks without dragging
                if (this.props.onStartEditing) {
                  this.props.onStartEditing();
                }
              }
            }}
            onBlur={() => {
              // Stop editing if the editor loses focus
              if (this.props.onStopEditing && editing) {
                this.props.onStopEditing();
              }
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
          style={this.props.node.toCSS()}
        />
      </>
    );
  }

}
