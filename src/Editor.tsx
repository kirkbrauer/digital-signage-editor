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
      const newState = this.props.editorState.setSelectionGroup(node as ImmutableGroupNode);
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
      this.props.onChange(newState);
    }
  }

  private onDeselect() {
    if (this.props.onChange) {
      // Allow multiple selection when shift is pressed
      if (!this.state.keysPressed.includes('Shift')) {
        const newState = this.props.editorState.deselectAll();
        this.props.onChange(newState);
      }
    }
  }
  
  render() {
    const selectionGroup = this.props.editorState.getSelectionGroup();
    return (
      <div style={{
        width: this.props.editorState.getDocument().getWidth(),
        height: this.props.editorState.getDocument().getHeight(),
        position: 'relative'
      }}>
        {this.props.editorState.getSelectionGroup() ? (
          <Group
            key={selectionGroup!.getID()}
            node={selectionGroup!}
            selected={true}
            onDeselect={() => this.onDeselect()}
            onChange={node => this.onSelectionGroupNodeChange(node)}
          />) : null}
        {this.props.editorState.getDocument().getNodes().map((node) => {
          // Only render the node if it isn't in the selection group
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
              onDeselect={() => this.onDeselect()}
              selected={this.props.editorState.getSelectedIds().includes(node.getID())}
              onChange={node => this.onNodeChange(node)}
            />
          );
        })}
      </div>
    );
  }

}
