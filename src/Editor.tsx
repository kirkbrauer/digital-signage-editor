import React, { Component } from 'react';
import { EditorState, Node as ImmutableNode } from './model/immutable';
import Node from './components/Node';
import Group from './components/Group';

type OnChangeEvent = (editorState: EditorState) => void;

interface EditorProps {
  editorState: EditorState;
  shift?: boolean;
  onChange?: OnChangeEvent;
  width?: number;
  height?: number;
}

export default class Editor extends Component<EditorProps> {

  private setEditorState(editorState: EditorState) {
    if (this.props.onChange) {
      this.props.onChange(editorState);
    }
  }

  private getEditorState() {
    return this.props.editorState;
  }

  private onSelectionGroupNodeChange(node: ImmutableNode) {
    const newState = this.getEditorState().updateSelectionGroup(node);
    this.setEditorState(newState);
  }

  private onNodeChange(node: ImmutableNode) {
    const newDocument = this.getEditorState().document.updateNode(node);
    const newState = this.getEditorState().set('document', newDocument);
    this.setEditorState(newState);
  }

  private onSelect(id: string) {
    // Allow multiple selection when shift is pressed
    const newState = this.getEditorState().select(id, Boolean(this.props.shift));
    // Stop editing the node when another node is selected
    this.setEditorState(newState.set('editing', null));
  }

  private onStartEditing(id: string) {
    const newState = this.getEditorState().set('editing', id);
    this.setEditorState(newState);
  }

  private onStopEditing() {
    const newState = this.getEditorState().set('editing', null);
    this.setEditorState(newState);
  }

  private onDeselect() {
    // Allow multiple selection when shift is pressed
    if (!this.props.shift) {
      const newState = this.getEditorState().deselectAll().set('editing', null);
      this.setEditorState(newState);
    }
  }
  
  private onEditorClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // Get the x and y position of the click relative to the editor element
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    // Check if the click is outside the current selection
    // A 5 px buffer is added to accommodate the resize handles
    const editorState = this.getEditorState();
    if (editorState.selectedIDs.count() > 0) {
      if (
        !(
          (
            (xPos >= editorState.getSelectionX() - 5) &&
            (xPos <= (editorState.getSelectionX() + editorState.getSelectionWidth() + 5))
          ) &&
          (
            (yPos >= editorState.getSelectionY() - 5) &&
            (yPos <= (editorState.getSelectionY() + editorState.getSelectionHeight() + 5))
          )
        )
      ) {
        // Deselect all nodes
        this.setEditorState(editorState.deselectAll().set('editing', null));
      }
    }
  }

  render() {
    return (
      <div
        style={{
          width: this.getEditorState().document.width,
          height: this.getEditorState().document.height,
          position: 'relative'
        }}
        onClick={e => this.onEditorClick(e)}
      >
        {this.getEditorState().document.nodes.reverse().map((node) => {
          // Only render the node if it isn't in the selection group or being edited
          if (this.getEditorState().editing === node.id) {
            return null;
          }
          if (this.getEditorState().selectedIDs.count() > 1) {
            if (this.getEditorState().selectedIDs.includes(node.id)) {
              return null;
            }
          }
          return (
            <Node
              key={node.id}
              node={node}
              onSelect={() => this.onSelect(node.id)}
              onStartEditing={() => this.onStartEditing(node.id)}
              onStopEditing={() => this.onStopEditing()}
              onDeselect={() => this.onDeselect()}
              selected={this.getEditorState().selectedIDs.includes(node.id)}
              editing={false}
              onChange={node => this.onNodeChange(node)}
            />
          );
        })}
        {this.getEditorState().selectionGroup ? (
          <Group
            key={this.getEditorState().selectionGroup!.id}
            node={this.getEditorState().selectionGroup!}
            selected={true}
            editing={false}
            onDeselect={() => this.onDeselect()}
            onChange={node => this.onSelectionGroupNodeChange(node)}
          />) : null}
        {this.getEditorState().getEditNode() ? (
          <Node
            key={this.getEditorState().getEditNode()!.id}
            node={this.getEditorState().getEditNode()!}
            onDeselect={() => this.onDeselect()}
            onChange={(node: ImmutableNode) => this.onNodeChange(node)}
            editing={true}
            selected={true}
          />) : null}
      </div>
    );
  }

}
