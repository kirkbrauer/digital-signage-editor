import React, { Component } from 'react';
import { EditorState, Node as ImmutableNode, GroupNode as ImmutableGroupNode } from './model/immutable';
import Node from './components/Node';
import Group from './components/Group';

type OnChangeEvent = (editorState: EditorState) => void;

interface EditorProps {
  editorState: EditorState;
  onChange?: OnChangeEvent;
  width?: number;
  height?: number;
}

interface TempEditorState {
  keysPressed: string[];
}

export default class Editor extends Component<EditorProps, TempEditorState> {

  constructor(props: EditorProps) {
    super(props);
    this.state = {
      keysPressed: []
    };
  }

  private keyDownListener = (e: KeyboardEvent) => this.onKeyDown(e);
  private keyUpListener = (e: KeyboardEvent) => this.onKeyUp(e);

  private onKeyDown(e: KeyboardEvent) {
    this.setState({ keysPressed: [...this.state.keysPressed, e.key] });
  }

  private onKeyUp(e: KeyboardEvent) {
    const keysPressed = this.state.keysPressed;
    if (keysPressed.includes(e.key)) {
      keysPressed.splice(keysPressed.indexOf(e.key));
    }
    this.setState({ keysPressed });
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownListener);
    document.addEventListener('keyup', this.keyUpListener);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownListener);
    document.removeEventListener('keyup', this.keyUpListener);
  }

  private onSelectionGroupNodeChange(node: ImmutableNode) {
    if (this.props.onChange) {
      const newState = this.props.editorState.updateSelectionGroup(node as ImmutableGroupNode);
      this.props.onChange(newState);
    }
  }

  private onNodeChange(node: ImmutableNode) {
    if (this.props.onChange) {
      const newDocument = this.props.editorState.getDocument().updateNode(node);
      const newState = this.props.editorState.setDocument(newDocument);
      this.props.onChange(newState);
    }
  }

  private onSelect(id: string) {
    if (this.props.onChange) {
      // Allow multiple selection when shift is pressed
      const newState = this.props.editorState.select(
        id,
        this.state.keysPressed.includes('Shift')
      );
      // Stop editing the node when another node is selected
      this.props.onChange(newState.stopEditing());
    }
  }

  private onStartEditing(id: string) {
    if (this.props.onChange) {
      const newState = this.props.editorState.edit(id);
      this.props.onChange(newState);
    }
  }

  private onStopEditing() {
    if (this.props.onChange) {
      const newState = this.props.editorState.stopEditing();
      this.props.onChange(newState);
    }
  }

  private onDeselect() {
    if (this.props.onChange) {
      // Allow multiple selection when shift is pressed
      if (!this.state.keysPressed.includes('Shift')) {
        const newState = this.props.editorState.deselectAll().stopEditing();
        this.props.onChange(newState);
      }
    }
  }
  
  private onEditorClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // Get the x and y position of the click relative to the editor element
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    // Check if the click is outside the current selection
    // A 5 px buffer is added to accommodate the resize handles
    const editorState = this.props.editorState;
    if (
      !(
        (
          (xPos >= editorState.getSelectionXPos() - 5) &&
          (xPos <= (editorState.getSelectionXPos() + editorState.getSelectionWidth() + 5))
        ) &&
        (
          (yPos >= editorState.getSelectionYPos() - 5) &&
          (yPos <= (editorState.getSelectionYPos() + editorState.getSelectionHeight() + 5))
        )
      )
    ) {
      if (this.props.onChange) {
        this.props.onChange(editorState.deselectAll());
      }
    }
  }

  render() {
    return (
      <div
        style={{
          width: this.props.editorState.getDocument().getWidth(),
          height: this.props.editorState.getDocument().getHeight(),
          position: 'relative'
        }}
        onClick={e => this.onEditorClick(e)}
      >
        {this.props.editorState.getEditNode() ? (
          <Node
            key={this.props.editorState.getEditNode()!.getID()}
            node={this.props.editorState.getEditNode()!}
            onDeselect={() => this.onDeselect()}
            onChange={node => this.onNodeChange(node)}
            editing={true}
            selected={true}
          />) : null}
        {this.props.editorState.getSelectionGroup() ? (
          <Group
            key={this.props.editorState.getSelectionGroup()!.getID()}
            node={this.props.editorState.getSelectionGroup()!}
            selected={true}
            editing={false}
            onDeselect={() => this.onDeselect()}
            onChange={node => this.onSelectionGroupNodeChange(node)}
          />) : null}
        {this.props.editorState.getDocument().getNodes().map((node) => {
          // Only render the node if it isn't in the selection group or being edited
          if (this.props.editorState.getEditId() === node.getID()) {
            return null;
          }
          if (this.props.editorState.getSelectedIds().length > 1) {
            if (this.props.editorState.getSelectedIds().includes(node.getID())) {
              return null;
            }
          }
          return (
            <Node
              key={node.getID()}
              node={node}
              onSelect={() => this.onSelect(node.getID())}
              onStartEditing={() => this.onStartEditing(node.getID())}
              onStopEditing={() => this.onStopEditing()}
              onDeselect={() => this.onDeselect()}
              selected={this.props.editorState.getSelectedIds().includes(node.getID())}
              editing={false}
              onChange={node => this.onNodeChange(node)}
            />
          );
        })}
      </div>
    );
  }

}
