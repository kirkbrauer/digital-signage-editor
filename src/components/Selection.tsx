import React, { Component } from 'react';
// import Resizable, { ResizableDirection, NumberSize } from 're-resizable';
// import Draggable, { DraggableData } from 'react-draggable';
import { List } from 'immutable';
import { Node, Sizeable, Vector, Size } from '../model/immutable';
import Transformer from './Transformer';

export interface SelectionProps {
  nodes: List<Node>;
  onChange: (nodes: List<Node>) => void;
}

interface SelectionState {
  position: Vector;
  size: Size;
}

export default class Selection extends Component<SelectionProps, SelectionState> {

  constructor(props: SelectionProps) {
    super(props);
    const position = Sizeable.calculatePosition(props.nodes);
    const size = Sizeable.calculateSize(props.nodes);
    this.state = {
      position,
      size
    };
  }

  componentWillReceiveProps(props: SelectionProps) {
    const position = Sizeable.calculatePosition(props.nodes);
    const size = Sizeable.calculateSize(props.nodes);
    this.setState({ position, size });
  }

  private onDrag(position: Vector) {
    this.setState({ position });
    if (this.props.onChange) {
      this.props.onChange(
        Sizeable.setSizeablePositions(
          this.props.nodes,
          position
        )
      );
    }
  }

  private onResize(size: Size, position: Vector) {
    this.setState({ size, position });
    if (this.props.onChange) {
      /*const oldX = Sizeable.calculateX(this.props.nodes);
      const oldY = Sizeable.calculateY(this.props.nodes);
      const oldWidth = Sizeable.calculateWidth(this.props.nodes, oldX);
      const oldHeight = Sizeable.calculateHeight(this.props.nodes, oldY);*/
      this.props.onChange(
        Sizeable.setSizeableSizes(
          Sizeable.setSizeablePositions(
            this.props.nodes,
            position
          ),
          size
        )
      );
    }
  }

  public render() {
    return (
      <Transformer
        position={this.state.position}
        size={this.state.size}
        rotation={0}
        disableRotation
        onDrag={(e, pos) => this.onDrag(pos)}
        onResize={(e, size, pos) => this.onResize(size, pos)}
      />
    );
  }

}
