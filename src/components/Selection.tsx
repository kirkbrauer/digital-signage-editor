import React, { Component } from 'react';
// import Resizable, { ResizableDirection, NumberSize } from 're-resizable';
// import Draggable, { DraggableData } from 'react-draggable';
import { List } from 'immutable';
import { Node, Sizeable, Position, Size } from '../model/immutable';
import Transformer from './Transformer';

export interface SelectionProps {
  nodes: List<Node>;
  onChange: (nodes: List<Node>) => void;
}

interface SelectionState {
  position: Position;
  size: Size;
}

export default class Selection extends Component<SelectionProps, SelectionState> {

  constructor(props: SelectionProps) {
    super(props);
    const position: Position = {
      x: Sizeable.calculateX(props.nodes),
      y: Sizeable.calculateY(props.nodes)
    };
    const size: Size = {
      width: Sizeable.calculateWidth(props.nodes, position.x),
      height: Sizeable.calculateHeight(props.nodes, position.y)
    };
    this.state = {
      position,
      size
    };
  }

  componentWillReceiveProps(props: SelectionProps) {
    const position: Position = {
      x: Sizeable.calculateX(props.nodes),
      y: Sizeable.calculateY(props.nodes)
    };
    const size: Size = {
      width: Sizeable.calculateWidth(props.nodes, position.x),
      height: Sizeable.calculateHeight(props.nodes, position.y)
    };
    this.setState({ position, size });
  }

  private onDrag(position: Position) {
    this.setState({ position });
    if (this.props.onChange) {
      const oldX = Sizeable.calculateX(this.props.nodes);
      const oldY = Sizeable.calculateY(this.props.nodes);
      this.props.onChange(
        Sizeable.setSizeableXPositions(
          Sizeable.setSizeableYPositions(
            this.props.nodes,
            oldY,
            position.y
          ),
          oldX,
          position.x
        )
      );
    }
  }

  private onResize(size: Size, position: Position) {
    this.setState({ size, position });
    if (this.props.onChange) {
      const oldX = Sizeable.calculateX(this.props.nodes);
      const oldY = Sizeable.calculateY(this.props.nodes);
      const oldWidth = Sizeable.calculateWidth(this.props.nodes, oldX);
      const oldHeight = Sizeable.calculateHeight(this.props.nodes, oldY);
      this.props.onChange(
        Sizeable.setSizeableWidths(
          Sizeable.setSizeableHeights(
            Sizeable.setSizeableXPositions(
              Sizeable.setSizeableYPositions(
                this.props.nodes,
                oldY,
                position.y
              ),
              oldX,
              position.x
            ),
            oldY,
            oldHeight,
            size.height
          ),
          oldX,
          oldWidth,
          size.width
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
        onDrag={(e, pos) => this.onDrag(pos)}
        onResize={(e, size, pos) => this.onResize(size, pos)}
      />
    );
  }

}
