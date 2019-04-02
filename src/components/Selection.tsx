import React, { Component } from 'react';
import Resizable, { ResizableDirection, NumberSize } from 're-resizable';
import Draggable, { DraggableData } from 'react-draggable';
import { List } from 'immutable';
import { Node, Sizeable } from '../model/immutable';

export interface SelectionProps {
  nodes: List<Node>;
  onChange: (nodes: List<Node>) => void;
}

export default class Selection extends Component<SelectionProps> {

  private onDrag(e: any, data: DraggableData) {
    if (this.props.onChange) {
      const oldX = Sizeable.calculateX(this.props.nodes);
      const oldY = Sizeable.calculateY(this.props.nodes);
      this.props.onChange(
        Sizeable.setSizeableXPositions(
          Sizeable.setSizeableYPositions(
            this.props.nodes,
            oldY,
            data.y
          ),
          oldX,
          data.x
        )
      );
    }
  }

  private onResize(e: MouseEvent | TouchEvent, dir: ResizableDirection, ref: HTMLDivElement, delta: NumberSize) {
    if (this.props.onChange) {
      const oldX = Sizeable.calculateX(this.props.nodes);
      const oldY = Sizeable.calculateY(this.props.nodes);
      const oldWidth = Sizeable.calculateWidth(this.props.nodes, oldX);
      const oldHeight = Sizeable.calculateHeight(this.props.nodes, oldY);
      let newNodes = this.props.nodes;
      // Calculate the position delta since the last resize
      const deltaX = ref.clientWidth - oldWidth;
      const deltaY = ref.clientHeight - oldHeight;
      // Calculate the new positions
      const xPos = oldX - deltaX;
      const yPos = oldY - deltaY;
      // Set the new position based on resize direction
      if (dir === 'top' || dir === 'left' || dir === 'topLeft') {
        newNodes = Sizeable.setSizeableXPositions(
          Sizeable.setSizeableYPositions(
            this.props.nodes,
            oldY,
            yPos
          ),
          oldX,
          xPos
        );
        // Set the widths and heights of the selected nodes
        newNodes = Sizeable.setSizeableWidths(newNodes, xPos, oldWidth, ref.clientWidth);
        newNodes = Sizeable.setSizeableHeights(newNodes, yPos, oldHeight, ref.clientHeight);
      } else if (dir === 'topRight') {
        newNodes = Sizeable.setSizeableYPositions(
          this.props.nodes,
          oldY,
          yPos
        );
        // Set the widths and heights of the selected nodes
        newNodes = Sizeable.setSizeableWidths(newNodes, oldX, oldWidth, ref.clientWidth);
        newNodes = Sizeable.setSizeableHeights(newNodes, yPos, oldHeight, ref.clientHeight);
      } else if (dir === 'bottomLeft') {
        newNodes = Sizeable.setSizeableXPositions(
          this.props.nodes,
          oldX,
          xPos
        );
        // Set the widths and heights of the selected nodes
        newNodes = Sizeable.setSizeableWidths(newNodes, xPos, oldWidth, ref.clientWidth);
        newNodes = Sizeable.setSizeableHeights(newNodes, oldY, oldHeight, ref.clientHeight);
      } else {
        // Set the widths and heights of the selected nodes
        newNodes = Sizeable.setSizeableWidths(newNodes, oldX, oldWidth, ref.clientWidth);
        newNodes = Sizeable.setSizeableHeights(newNodes, oldY, oldHeight, ref.clientHeight);
      }
      this.props.onChange(newNodes);
    }
  }

  public render() {
    const { nodes } = this.props;
    const xPos = Sizeable.calculateX(nodes);
    const yPos = Sizeable.calculateY(nodes);
    const width = Sizeable.calculateWidth(nodes, xPos);
    const height = Sizeable.calculateHeight(nodes, yPos);
    const resizeHandleStyle = {
      height: 9,
      width: 9,
      backgroundColor: 'blue',
      borderRadius: '50%',
      boxShadow: '0 0 0 1px white'
    };
    return (
      <div style={{ cursor: 'move' }}>
        <Draggable
          position={{
            x: xPos,
            y: yPos
          }}
          onDrag={(e, data) => {
            e.stopPropagation();
            this.onDrag(e, data);
          }}
          onStop={(e) => {
            e.stopPropagation();
          }}
        >
          <Resizable
            style={{
              position: 'absolute'
            }}
            size={{ width, height }}
            enable={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true
            }}
            onResizeStart={(e) => {
              e.stopPropagation();
            }}
            onResize={(e, direction, ref, d) => {
              e.stopPropagation();
              this.onResize(e, direction, ref, d);
            }}
            onResizeStop={(e) => {
              e.stopPropagation();
            }}
            handleStyles={{
              top: {
                ...resizeHandleStyle,
                left: 'calc(50% - 4.5px)'
              },
              left: {
                ...resizeHandleStyle,
                top: 'calc(50% - 4.5px)'
              },
              right: {
                ...resizeHandleStyle,
                top: 'calc(50% - 4.5px)'
              },
              bottom: {
                ...resizeHandleStyle,
                left: 'calc(50% - 4.5px)'
              },
              topLeft: {
                top: -5,
                left: -5,
                ...resizeHandleStyle
              },
              topRight: {
                top: -5,
                right: -5,
                ...resizeHandleStyle
              },
              bottomLeft: {
                bottom: -5,
                left: -5,
                ...resizeHandleStyle
              },
              bottomRight: {
                bottom: -5,
                right: -5,
                ...resizeHandleStyle
              }
            }}
            handleWrapperStyle={{
              display: 'block',
              height: '100%',
              width: '100%',
              position: 'relative',
              boxShadow: 'blue 0 0 0 1px, rgba(0, 0, 255, 0.8) 0 0 1px 1px, rgba(0, 0, 255, 0.8) inset 0 0 1px 1px'
            }}
          />
        </Draggable>
      </div>
    );
  }

}
