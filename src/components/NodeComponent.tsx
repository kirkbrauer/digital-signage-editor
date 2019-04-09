import React, { Component } from 'react';
import { Vector, Size } from '../model/immutable';
import { NodeProps } from './Node';
import Transformer from './Transformer';

abstract class NodeComponent extends Component<NodeProps> {

  protected dragging = false;
  protected resizing = false;
  protected rotating = false;

  protected abstract renderStaticContent(): JSX.Element;

  protected renderEditableContent(): JSX.Element {
    return this.renderStaticContent();
  }

  private onSelect(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (this.props.onSelect) {
      this.props.onSelect();
    }
  }

  private onDrag(pos: Vector) {
    if (this.props.onChange) {
      this.props.onChange(
        this.props.node.setPosition(pos)
      );
    }
  }

  private onResize(size: Size, pos: Vector) {
    if (this.props.onChange) {
      this.props.onChange(this.props.node.setPosition(pos).setSize(size));
    }
  }

  private onRotate(angle: number) {
    console.log(angle);
    if (this.props.onChange) {
      this.props.onChange(this.props.node.set('rotation', angle));
    }
  }

  public render() {
    const { node } = this.props;
    return (
      <Transformer
        disabled={!this.props.selected || this.props.inGroup}
        position={node.getPosition()}
        size={node.getSize()}
        rotation={node.rotation}
        disableRotation
        onDrag={() => {
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
        onResizeStop={(e, size, pos) => {
          this.resizing = false;
          this.onResize(size, pos);
        }}
        onRotate={() => {
          this.rotating = true;
        }}
        onRotateStop={(e, angle) => {
          this.rotating = false;
          this.onRotate(angle);
        }}
      >
        {this.renderStaticContent()}
      </Transformer>
    );
  }

}

export default NodeComponent;
