import React, { Component, CSSProperties } from 'react';
import { Vector, Size } from '../model/immutable';

export enum ResizeDirection {
  TOP = 'TOP',
  RIGHT = 'RIGHT',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  TOP_RIGHT = 'TOP_RIGHT',
  TOP_LEFT = 'TOP_LEFT',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT'
}

export interface TransformerProps {
  position: Vector;
  size: Size;
  rotation: number;
  disabled?: boolean;
  disableRotation?: boolean;
  disableResize?: boolean;
  disableDrag?: boolean;
  onResizeStart?: (e: MouseEvent | TouchEvent, size: Size, position: Vector, direction: ResizeDirection) => void;
  onResize?: (e: MouseEvent | TouchEvent, size: Size, position: Vector, direction: ResizeDirection) => void;
  onResizeStop?: (e: MouseEvent | TouchEvent, size: Size, position: Vector, direction: ResizeDirection) => void;
  onRotateStart?: (e: MouseEvent | TouchEvent, angle: number) => void;
  onRotate?: (e: MouseEvent | TouchEvent, angle: number) => void;
  onRotateStop?: (e: MouseEvent | TouchEvent, angle: number) => void;
  onDragStart?: (e: MouseEvent | TouchEvent, position: Vector) => void;
  onDrag?: (e: MouseEvent | TouchEvent, position: Vector) => void;
  onDragStop?: (e: MouseEvent | TouchEvent, position: Vector) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

interface TransformerState {
  tempPos: Vector | null;
  tempSize: Size | null;
  tempRotation: number | null;
}

export default class Transformer extends Component<TransformerProps, TransformerState> {

  constructor(props: TransformerProps) {
    super(props);
    this.state = {
      tempPos: null,
      tempSize: null,
      tempRotation: null
    };
  }

  private mouseDown = false;
  private dragging = false;
  private resizing = false;
  private rotating = false;

  componentWillReceiveProps() {
    // Rest the temporary state if new props come along
    this.setState({
      tempPos: null,
      tempSize: null,
      tempRotation: null
    });
  }

  /**
   * Returns the center position of the transformer.
   */
  private getCenterPosition(): Vector {
    return new Vector({
      x: this.props.position.x + this.props.size.width / 2,
      y: this.props.position.y + this.props.size.height / 2,
    });
  }

  /**
   * Returns the angle based on the cursor start position and the end position.
   * @param pos1 The start position of the cursor.
   * @param pos2 The end position of the cursor.
   */
  private calculateAngle(pos1: Vector, pos2: Vector): number {
    const dot = pos1.x * pos1.x + pos1.y * pos2.y;
    const det = pos1.x * pos1.y - pos1.y * pos2.x;
    // Convert the angle into degrees
    const angle = Math.atan2(det, dot) / Math.PI * 180;
    // Return the normalized angle
    return (angle + 360) % 360;
  }

  private calculatePosition(cursorPos: Vector, initialPos: Vector, cursorStartPos: Vector): Vector {
    const deltaX = cursorPos.x - cursorStartPos.x;
    const deltaY = cursorPos.y - cursorStartPos.y;
    return new Vector({
      x: initialPos.x + deltaX,
      y: initialPos.y + deltaY
    });
  }

  private calculateSize(cursorPos: Vector, initialSize: Size, cursorStartPos: Vector, dir: ResizeDirection): Size {
    // Calculate the deltas of the cursor position
    const deltaX = cursorPos.x - cursorStartPos.x;
    const deltaY = cursorPos.y - cursorStartPos.y;
    switch (dir) {
      case ResizeDirection.TOP_LEFT: {
        return new Size({
          width: initialSize.width - deltaX,
          height: initialSize.height - deltaY
        });
      }
      case ResizeDirection.TOP: {
        return new Size({
          width: initialSize.width,
          height: initialSize.height - deltaY
        });
      }
      case ResizeDirection.TOP_RIGHT: {
        return new Size({
          width: initialSize.width + deltaX,
          height: initialSize.height - deltaY
        });
      }
      case ResizeDirection.RIGHT: {
        return new Size({
          width: initialSize.width + deltaX,
          height: initialSize.height
        });
      }
      case ResizeDirection.BOTTOM_RIGHT: {
        return new Size({
          width: initialSize.width + deltaX,
          height: initialSize.height + deltaY
        });
      }
      case ResizeDirection.BOTTOM: {
        return new Size({
          width: initialSize.width,
          height: initialSize.height + deltaY
        });
      }
      case ResizeDirection.BOTTOM_LEFT: {
        return new Size({
          width: initialSize.width - deltaX,
          height: initialSize.height + deltaY
        });
      }
      case ResizeDirection.LEFT: {
        return new Size({
          width: initialSize.width - deltaX,
          height: initialSize.height
        });
      }
      default: {
        return new Size({
          width: initialSize.width,
          height: initialSize.height
        });
      }
    }
  }

  private calculateResizePos(cursorPos: Vector, initialPos: Vector, cursorStartPos: Vector, dir: ResizeDirection): Vector {
    switch (dir) {
      case ResizeDirection.TOP_LEFT: {
        return this.calculatePosition(cursorPos, initialPos, cursorStartPos);
      }
      case ResizeDirection.TOP: {
        return this.calculatePosition(new Vector({ x: cursorStartPos.x, y: cursorPos.y }), initialPos, cursorStartPos);
      }
      case ResizeDirection.TOP_RIGHT: {
        return this.calculatePosition(new Vector({ x: cursorStartPos.x, y: cursorPos.y }), initialPos, cursorStartPos);
      }
      case ResizeDirection.BOTTOM_LEFT: {
        return this.calculatePosition(new Vector({ x: cursorPos.x, y: cursorStartPos.y }), initialPos, cursorStartPos);
      }
      case ResizeDirection.LEFT: {
        return this.calculatePosition(new Vector({ x: cursorPos.x, y: cursorStartPos.y }), initialPos, cursorStartPos);
      }
      default: return initialPos;
    }
  }

  private onStartDrag(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // Stop event propagation
    e.stopPropagation();
    e.preventDefault();
    this.mouseDown = true;
    // Set the intial position of the transformer
    const initialPos = new Vector({
      x: this.props.position.x,
      y: this.props.position.y
    });
    // Set the start position of the cursor
    const cursorStartPos = new Vector({
      x: e.screenX,
      y: e.screenY
    });
    // Call onDragStart callback
    this.props.onDragStart && this.props.onDragStart(e.nativeEvent, initialPos);
    // Calculates the position by adding the cursor delta to the initial position
    const onMouseMove = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      // Make sure that the mouse is down
      if (!this.mouseDown) return;
      // Trigger the on drag start if dragging hasn't started
      if (!this.dragging) {
        this.dragging = true;
      }
      // Calculate the new position
      const newPos = this.calculatePosition(new Vector({ x: e.screenX, y: e.screenY }), initialPos, cursorStartPos);
      // Update the temporary state
      this.setState({
        tempPos: new Vector({
          x: newPos.x > 0 ? newPos.x : 0,
          y: newPos.y > 0 ? newPos.y : 0
        })
      });
      // Call the onDrag callback
      this.props.onDrag && this.props.onDrag(e, newPos);
    };
    const onMouseUp = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      // Remove the event listeners
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      // Return if the mouse isn't down
      if (!this.mouseDown || !this.dragging) return;
      this.dragging = false;
      // Call the onDragStop callback
      this.props.onDragStop && this.props.onDragStop(e, this.state.tempPos || initialPos);
    };
    // Add the drag event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  private onStartResize(e: React.MouseEvent<HTMLDivElement, MouseEvent>, dir: ResizeDirection) {
    // Stop event propagation
    e.stopPropagation();
    e.preventDefault();
    this.mouseDown = true;
    // Set the start position of the cursor
    const cursorStartPos = new Vector({
      x: e.screenX,
      y: e.screenY
    });
    // Set the initial position of the transformer
    const initialPos = new Vector({
      x: this.props.position.x,
      y: this.props.position.y
    });
    // Set the initial size of the transformer
    const initialSize = new Size({
      width: this.props.size.width,
      height: this.props.size.height
    });
    // Call onResizeStart callback
    this.props.onResizeStart && this.props.onResizeStart(e.nativeEvent, initialSize, initialPos, dir);
    const onMouseMove = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      // Make sure that the mouse is down
      if (!this.mouseDown) return;
      // Trigger the on drag start if dragging hasn't started
      if (!this.resizing) {
        this.resizing = true;
      }
      // Calculate the new size
      const newSize = this.calculateSize(new Vector({ x: e.screenX, y: e.screenY }), initialSize, cursorStartPos, dir);
      // Calculate the new position
      const newPos = this.calculateResizePos(new Vector({ x: e.screenX, y: e.screenY }), initialPos, cursorStartPos, dir);
      // Update the temporary state
      this.setState({
        tempSize: new Size({
          width: newSize.width > 20 ? newSize.width : 20,
          height: newSize.height > 20 ? newSize.height : 20
        }), 
        tempPos: new Vector({
          x: newPos.x > 0 ? newPos.x : 0,
          y: newPos.y > 0 ? newPos.y : 0
        })
      });
      // Call the onResize callback
      this.props.onResize && this.props.onResize(e, newSize, newPos, dir);
    };
    const onMouseUp = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      // Remove the event listeners
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      // Return if the mouse isn't down
      if (!this.mouseDown || !this.resizing) return;
      this.resizing = false;
      // Call the onResizeStop callback
      this.props.onResizeStop && this.props.onResizeStop(e, this.state.tempSize || initialSize, this.state.tempPos || initialPos, dir);
    };
    // Add the drag event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  private onStartRotate(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // Only activate on left click drag
    if (e.button !== 0) return;
    // Stop event propagation
    e.stopPropagation();
    e.preventDefault();
    this.mouseDown = true;
    // Calculate the center position
    const center = this.getCenterPosition();
    // Create a start position
    const start = new Vector({
      x: e.clientX - center.x,
      y: e.clientY - center.y
    });
    const initialRotation = this.props.rotation;
    // Call the onRotateStart
    this.props.onRotateStart && this.props.onRotateStart(e.nativeEvent, this.props.rotation);
    const onMouseMove = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      // Make sure that the mouse is down
      if (!this.mouseDown) return;
      // Trigger the on drag start if dragging hasn't started
      if (!this.rotating) {
        this.rotating = true;
      }
      // Create a rotation vector
      const rotate = new Vector({
        x: e.clientX - center.x,
        y: e.clientY - center.y
      });
      // Calculate the new angle
      const angle = ((this.calculateAngle(start, rotate) + initialRotation) + 360) % 360;
      // Update the temporary state
      this.setState({
        tempRotation: angle
      });
      // Call the onRotate callback
      this.props.onRotate && this.props.onRotate(e, angle);
    };
    const onMouseUp = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      // Remove the event listeners
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      // Return if the mouse isn't down
      if (!this.mouseDown || !this.rotating) return;
      this.rotating = false;
      // Call the onRotateStop callback
      this.props.onRotateStop && this.props.onRotateStop(e, this.state.tempRotation || initialRotation);
    };
    // Add the drag event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  public render() {
    const { position, rotation, size } = this.props;
    const resizeHandleStyle: CSSProperties = {
      height: 9,
      width: 9,
      backgroundColor: 'blue',
      borderRadius: '50%',
      boxShadow: '0 0 0 1px white',
      position: 'absolute'
    };
    return (
      <div
        style={{
          cursor: !this.props.disabled ? 'move' : undefined,
          transform: `translate(${this.state.tempPos ? this.state.tempPos.x : position.x}px, ${this.state.tempPos ? this.state.tempPos.y : position.y}px) rotate(${this.state.tempRotation || rotation}deg)`,
          height: this.state.tempSize ? this.state.tempSize.height : size.height,
          width: this.state.tempSize ? this.state.tempSize.width : size.width,
          transformOrigin: 'top left',
          position: 'absolute'
        }}
        onMouseDown={e => {
          !this.props.disableDrag && this.onStartDrag(e)}
        }
        onClick={(e) => { this.props.onClick && this.props.onClick(e); }}
      >
        {this.props.children}
        {!this.props.disabled && (
          <>
            <div style={{
              height: '100%',
              width: '100%',
              pointerEvents: 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              boxShadow: 'blue 0 0 0 1px, rgba(0, 0, 255, 0.8) 0 0 1px 1px, rgba(0, 0, 255, 0.8) inset 0 0 1px 1px'
            }} />
            {!this.props.disableRotation && (
              <div style={{
                top: -25,
                position: 'absolute',
                left: 'calc(50% - 4.5px)'
              }}>
                <div
                  id="rotate-line"
                  style={{
                    height: 20,
                    width: 0,
                    top: 2,
                    transform: 'translateX(4.5px)',
                    position: 'absolute',
                    boxShadow: 'blue 0 0 0 0.5px, rgba(0, 0, 255, 0.8) 0 0 1px 1px, rgba(0, 0, 255, 0.8) inset 0 0 1px 1px'
                  }}
                />
                <div
                  id="rotate"
                  style={{
                    ...resizeHandleStyle,
                    cursor: 'crosshair',
                    top: 0,
                    left: 0
                  }}
                  onMouseDown={e => this.onStartRotate(e)}
                />
              </div>
            )}
            {!this.props.disableResize && (
              <>
                <div
                  id="top-left"
                  style={{
                    ...resizeHandleStyle,
                    top: -5,
                    left: -5,
                    cursor: 'nw-resize'
                  }}
                  onMouseDown={e => this.onStartResize(e, ResizeDirection.TOP_LEFT)}
                />
                <div
                  id="top"
                  style={{
                    ...resizeHandleStyle,
                    top: -5,
                    left: 'calc(50% - 4.5px)',
                    cursor: 'n-resize'
                  }}
                  onMouseDown={e => this.onStartResize(e, ResizeDirection.TOP)}
                />
                <div
                  id="top-right"
                  style={{
                    ...resizeHandleStyle,
                    top: -5,
                    right: -5,
                    cursor: 'ne-resize'
                  }}
                  onMouseDown={e => this.onStartResize(e, ResizeDirection.TOP_RIGHT)}
                />
                <div
                  id="right"
                  style={{
                    ...resizeHandleStyle,
                    top: 'calc(50% - 4.5px)',
                    right: -5,
                    cursor: 'e-resize'
                  }}
                  onMouseDown={e => this.onStartResize(e, ResizeDirection.RIGHT)}
                />
                <div
                  id="bottom-right"
                  style={{
                    ...resizeHandleStyle,
                    bottom: -5,
                    right: -5,
                    cursor: 'se-resize'
                  }}
                  onMouseDown={e => this.onStartResize(e, ResizeDirection.BOTTOM_RIGHT)}
                />
                <div
                  id="bottom"
                  style={{
                    ...resizeHandleStyle,
                    left: 'calc(50% - 4.5px)',
                    bottom: -5,
                    cursor: 's-resize'
                  }}
                  onMouseDown={e => this.onStartResize(e, ResizeDirection.BOTTOM)}
                />
                <div
                  id="bottom-left"
                  style={{
                    ...resizeHandleStyle,
                    bottom: -5,
                    left: -5,
                    cursor: 'sw-resize'
                  }}
                  onMouseDown={e => this.onStartResize(e, ResizeDirection.BOTTOM_LEFT)}
                />
                <div
                  id="left"
                  style={{
                    ...resizeHandleStyle,
                    top: 'calc(50% - 4.5px)',
                    left: -5, 
                    cursor: 'w-resize'
                  }}
                  onMouseDown={e => this.onStartResize(e, ResizeDirection.LEFT)}
                />
              </>
            )}
          </>
        )}
      </div>
    );
  }
}
