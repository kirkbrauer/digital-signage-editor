import React, { Component } from 'react';
import { Node } from '../model/immutable';
import Resizable, { ResizableDirection, NumberSize } from 're-resizable';
import Draggable, { DraggableData } from 'react-draggable';
import { NodeProps } from './Node';

abstract class NodeComponent extends Component<NodeProps> {

  protected dragging = false;

  protected abstract renderStaticContent(): JSX.Element;

  protected renderEditableContent(): JSX.Element {
    return this.renderStaticContent();
  }

  private onSelect(e: React.MouseEvent) {
    if (this.props.onSelect) {
      this.props.onSelect();
    }
  }

  private onDrag(e: any, data: DraggableData) {
    if (this.props.onChange) {
      this.props.onChange(
        this.props.node.setX(data.x).setY(data.y)
      );
    }
  }

  private onResize(e: MouseEvent | TouchEvent, dir: ResizableDirection, ref: HTMLDivElement, delta: NumberSize) {
    if (this.props.onChange) {
      let newNode: Node = this.props.node;
      // Calculate the position delta since the last resize
      const deltaX = ref.clientWidth - this.props.node.getWidth();
      const deltaY = ref.clientHeight - this.props.node.getHeight();
      // Calculate the new positions
      const xPos = this.props.node.getX() - deltaX;
      const yPos = this.props.node.getY() - deltaY;
      // Set the new position based on resize direction
      if (dir === 'top' || dir === 'left' || dir === 'topLeft') {
        newNode = newNode.setX(xPos).setY(yPos);
      } else if (dir === 'topRight') {
        newNode = newNode.setY(yPos);
      } else if (dir === 'bottomLeft') {
        newNode = newNode.setX(xPos);
      }
      newNode = newNode.setWidth(ref.clientWidth);
      newNode = newNode.setHeight(ref.clientHeight);
      this.props.onChange(newNode);
    }
  }

  public render() {
    const { node } = this.props;
    const resizeHandleStyle = {
      height: 9,
      width: 9,
      backgroundColor: 'blue',
      borderRadius: '50%',
      boxShadow: '0 0 0 1px white'
    };
    if (this.props.inGroup) {
      return (
        <div style={{
          transform: `translate(${node.getX() - this.props.groupX!}px, ${node.getY() - this.props.groupY!}px)`,
          height: node.getHeight(),
          width: node.getWidth(),
          position: 'absolute'
        }}>
          {this.renderStaticContent()}
        </div>
      );
    }
    if (this.props.editing) {
      return (
        <div style={{
          transform: `translate(${node.getX()}px, ${node.getY()}px)`,
          height: node.getHeight(),
          width: node.getWidth(),
          position: 'absolute',
          boxShadow: 'blue 0 0 0 1px, rgba(0, 0, 255, 0.8) 0 0 1px 1px, rgba(0, 0, 255, 0.8) inset 0 0 1px 1px'
        }}>
          {this.renderEditableContent()}
        </div>
      );
    }
    return (
      <div
        onDoubleClick={() => {
          if (this.props.onStartEditing) {
            this.props.onStartEditing();
          }
        }}
        style={{
          cursor: 'move'
        }}
      >
        <Draggable
          position={{
            x: node.getX(),
            y: node.getY()
          }}
          onStart={() => {
            if (this.props.onSelect) this.props.onSelect();
          }}
          onDrag={(e) => {
            this.dragging = true;
            e.stopPropagation();
          }}
          onStop={(e, data) => {
            this.dragging = false;
            e.stopPropagation();
            this.onDrag(e, data);
            if (this.props.onSelect) this.props.onSelect();
          }}
        >
          <Resizable
            style={{
              position: 'absolute'
            }}
            onClick={e => this.onSelect(e)}
            size={{ width: node.getWidth(), height: node.getHeight() }}
            enable={{
              top: this.props.selected,
              right: this.props.selected,
              bottom: this.props.selected,
              left: this.props.selected,
              topRight: this.props.selected,
              bottomRight: this.props.selected,
              bottomLeft: this.props.selected,
              topLeft: this.props.selected
            }}
            onResizeStart={(e) => {
              e.stopPropagation();
              if (this.props.onSelect) this.props.onSelect();
            }}
            onResize={(e, direction, ref, d) => {
              e.stopPropagation();
              this.onResize(e, direction, ref, d);
            }}
            onResizeStop={(e) => {
              e.stopPropagation();
            }}
            handleStyles={this.props.selected ? {
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
            } : undefined}
            handleWrapperStyle={this.props.selected ? {
              display: 'block',
              height: '100%',
              width: '100%',
              position: 'relative',
              boxShadow: 'blue 0 0 0 1px, rgba(0, 0, 255, 0.8) 0 0 1px 1px, rgba(0, 0, 255, 0.8) inset 0 0 1px 1px',
              top: '-100%'
            } : undefined}
          >
            {this.renderStaticContent()}
          </Resizable>
        </Draggable>
      </div>
    );
  }

}

export default NodeComponent;
