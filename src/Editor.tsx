import React, { Component } from 'react';
import { EditorState, Node as ImmutableNode, SelectionBox as ImmutableSelectionBox, Vector } from './model/immutable';
import Node from './components/Node';
import Selection from './components/Selection';
import { List } from 'immutable';
import SelectionBox from './components/SelectionBox';

type OnChangeEvent = (editorState: EditorState) => void;

interface EditorProps {
  editorState: EditorState;
  shift?: boolean;
  onChange?: OnChangeEvent;
  width?: number;
  height?: number;
  readOnly?: boolean;
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

  private onSelectionChange(nodes: List<ImmutableNode>) {
    if (this.props.onChange) {
      this.props.onChange(
        this.getEditorState().set('document',
          this.getEditorState().document.updateNodes(nodes)
        )
      );
    }
  }

  private onNodeChange(node: ImmutableNode) {
    const newDocument = this.getEditorState().document.updateNode(node);
    const newState = this.getEditorState().set('document', newDocument);
    this.setEditorState(newState);
  }

  private onSelect(id: string) {
    // Clear the selection box
    // Allow multiple selection when shift is pressed
    const newState = this.getEditorState().select(id, Boolean(this.props.shift));
    // Clear the previous selection box
    this.setEditorState(newState.set('selectionBox', null));
  }

  private onDeselect() {
    // Allow multiple selection when shift is pressed
    if (!this.props.shift) {
      const newState = this.getEditorState().deselectAll();
      this.setEditorState(newState);
    }
  }

  private getCursorPosition(e: React.MouseEvent<HTMLDivElement, MouseEvent>): Vector {
    // Get the x and y position of the click relative to the editor element
    const rect = e.currentTarget.getBoundingClientRect();
    return new Vector({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }

  private cursorOutsideSelection(e: React.MouseEvent<HTMLDivElement, MouseEvent>): boolean {
    const cursorPosition = this.getCursorPosition(e);
    // Check if the click is outside the current selection
    // A 5 px buffer is added to accommodate the resize handles
    const editorState = this.getEditorState();
    if (!editorState.selectedIDs.isEmpty()) {
      const selectionBoundingBox = editorState.getSelectionBoundingBox();
      if (
        !(
          (
            (cursorPosition.x >= selectionBoundingBox.getMinX() - 5) &&
            (cursorPosition.x <= (selectionBoundingBox.getMaxX() + 5))
          ) &&
          (
            (cursorPosition.y >= selectionBoundingBox.getMinY() - 5) &&
            (cursorPosition.y <= (selectionBoundingBox.getMaxY() + 5))
          )
        )
      ) {
        return true;
      }
      return false;
    }
    return true;
  }

  private onMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (this.cursorOutsideSelection(e) && !this.props.shift) {
      // Get the cursor position from the event
      const cursorPosition = this.getCursorPosition(e);
      // Create an empty selection box
      this.setEditorState(
        this.getEditorState().set('selectionBox',
          new ImmutableSelectionBox({
            startPos: cursorPosition,
            cursorPos: cursorPosition
          })
        ).deselectAll() // Deselect all nodes before allowing selection
      );
    }
  }

  private onMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // Update the selection box cursor position on mouse move
    if (this.getEditorState().selectionBox) {
      // Get the cursor position from the event
      const cursorPosition = this.getCursorPosition(e);
      // Set the cursor position of the selection box.
      let newState = this.getEditorState().setIn(['selectionBox', 'cursorPos'], cursorPosition);
      // Select nodes if they are inside the selection box
      for (const node of newState.document.nodes) {
        if (newState.selectionBox!.includes(node)) {
          newState = newState.select(node.id, true);
        } else {
          newState = newState.deselect(node.id);
        }
      }
      this.setEditorState(newState);
    }
  }

  private onMouseUp(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // Clear the selection box at the end of the selection
    if (this.getEditorState().selectionBox) {
      this.setEditorState(this.getEditorState().set('selectionBox', null));
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
        onMouseDown={e => this.onMouseDown(e)}
        onMouseMove={e => this.onMouseMove(e)}
        onMouseUp={e => this.onMouseUp(e)}
      >
        {this.getEditorState().document.nodes.reverse().map(node => (
          <Node
            key={node.id}
            node={node}
            onSelect={() => this.onSelect(node.id)}
            onDeselect={() => this.onDeselect()}
            selected={this.getEditorState().selectedIDs.includes(node.id)}
            onChange={node => this.onNodeChange(node)}
            readOnly={this.props.readOnly}
            inGroup={this.getEditorState().selectedIDs.includes(node.id) && this.getEditorState().selectedIDs.count() > 1}
          />
        ))}
        {this.getEditorState().selectedIDs.count() > 1 ? (
          <Selection
            nodes={this.getEditorState().getSelectedNodes()}
            onChange={nodes => this.onSelectionChange(nodes)}
          />
        ) : null}
        {this.getEditorState().selectionBox ?
          <SelectionBox box={this.getEditorState().selectionBox!} />
          : null}
      </div>
    );
  }

}
