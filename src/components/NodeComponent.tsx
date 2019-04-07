import React, { Component } from 'react';
import { Position, Size } from '../model/immutable';
import { NodeProps } from './Node';
import Transformer from './Transformer';

abstract class NodeComponent extends Component<NodeProps> {

  protected dragging = false;
  protected resizing = false;

  protected abstract renderStaticContent(): JSX.Element;

  protected renderEditableContent(): JSX.Element {
    return this.renderStaticContent();
  }

  private onSelect(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (this.props.onSelect) {
      this.props.onSelect();
    }
  }

  private onDrag(pos: Position) {
    if (this.props.onChange) {
      this.props.onChange(
        this.props.node.setX(pos.x).setY(pos.y)
      );
    }
  }

  private onResize(size: Size, pos: Position) {
    if (this.props.onChange) {
      this.props.onChange(this.props.node.setPosition(pos).setSize(size));
    }
  }

  public render() {
    const { node } = this.props;
    return (
      <Transformer
        disabled={!this.props.selected || this.props.inGroup}
        position={node.getPosition()}
        size={node.getSize()}
        rotation={0}
        onDrag={(e, pos) => {
          this.dragging = true;
          if (this.props.onSelect && !this.props.selected) this.props.onSelect();
        }}
        onDragStop={(e, pos) => {
          this.dragging = false;
          if (this.props.onSelect) this.props.onSelect();
          this.onDrag(pos);
        }}
        onClick={(e) => {
          this.onSelect(e);
        }}
        onResize={() => {
          this.resizing = true;
        }}
        onResizeStop={(e, size, pos, dir) => {
          this.resizing = false;
          this.onResize(size, pos);
        }}
      >
        {this.renderStaticContent()}
      </Transformer>
    );
  }

}

export default NodeComponent;
