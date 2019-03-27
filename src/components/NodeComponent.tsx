import React, { Component, CSSProperties } from 'react';
import { Node, ColorStop, GradientType, ImageScaleMode, ImageRepeatMode, StrokeAlign, Vector } from '../model/immutable';
import Resizable, { ResizableDirection, NumberSize } from 're-resizable';
import Draggable, { DraggableData } from 'react-draggable';
// import OutsideClickHandler from 'react-outside-click-handler';
import { Fill } from '../model/immutable/Fill';

export interface NodeProps<T extends Node> {
  node: T;
  inGroup?: boolean;
  groupPosition?: Vector;
  selected?: boolean;
  editing?: boolean;
  onStartEditing?: () => void;
  onStopEditing?: () => void;
  onSelect?: () => void;
  onDeselect?: () => void;
  onChange?: (node: Node) => void;
}

abstract class NodeComponent<T extends Node, S = {}, SS = any> extends Component<NodeProps<T>, S, SS> {

  protected dragging = false;

  protected getGradientTypeString(gradientType?: GradientType): string {
    switch (gradientType) {
      case GradientType.LINEAR: return 'linear-gradient';
      case GradientType.RADIAL: return 'radial-gradient';
      default: return 'linear-gradient';
    }
  }

  protected getGradientString(gradientStops: ColorStop[], gradientAngle: number | null, gradientType: GradientType | null, fillOpacity: number): string {
    const stops: string[] = [];
    // Set the gradient angle
    const angle = gradientType === GradientType.RADIAL ? 'circle' : gradientAngle || 0;
    // Generate the gradient stops
    for (const stop of gradientStops) {
      stops.push(`${stop.color.toString(fillOpacity)} ${stop.position * 100}%`);
    }
    // Return the gradient sting
    return `${this.getGradientTypeString(gradientType || GradientType.LINEAR)}(${angle}deg, ${stops.join(',')})`;
  }

  protected getScaleModeString(scaleMode: ImageScaleMode | null): string | undefined {
    switch (scaleMode) {
      case ImageScaleMode.FIT: return 'contain';
      case ImageScaleMode.FILL: return 'cover';
      case ImageScaleMode.STRETCH: return '100% 100%';
      default: return undefined;
    }
  }

  protected getRepeatModeString(repeatMode: ImageRepeatMode | null): string | undefined {
    switch (repeatMode) {
      case ImageRepeatMode.REPEAT: return 'repeat';
      case ImageRepeatMode.REPEAT_X: return 'repeat-x';
      case ImageRepeatMode.REPEAT_Y: return 'repeat-y';
      default: return 'no-repeat';
    }
  }

  protected getFillStyle(fill: Fill | null): CSSProperties {
    if (fill) {
      if (fill.isVisible()) {
        if (fill.getImageURL()) {
          return {
            backgroundColor: `rgba(255,255,255,${fill.getOpacity()})`,
            backgroundImage: `url(${fill.getImageURL()})`,
            backgroundSize: this.getScaleModeString(fill.getScaleMode()),
            backgroundPosition: 'center',
            backgroundRepeat: fill.getScaleMode() === ImageScaleMode.REPEAT ? this.getRepeatModeString(fill.getRepeatMode()) : 'no-repeat'
          };
        }
        if (fill.getGradientStops().length > 0) {
          return {
            backgroundImage: this.getGradientString(fill.getGradientStops(), fill.getGradientAngle(), fill.getGradientType(), fill.getOpacity())
          };
        }
        if (fill.getColor()) {
          return {
            backgroundColor: fill.getColor()!.toString(fill.getOpacity())
          };
        }
      }
    }
    return {
      backgroundColor: 'rgba(0,0,0,0)'
    };
  }

  protected getStrokeStyle(stroke: Fill | null, weight: number | null, align: StrokeAlign | null): CSSProperties {
    if (stroke && weight) {
      if (stroke.isVisible()) {
        if (stroke.getColor()) {
          switch (align) {
            case StrokeAlign.OUTSIDE: return {
              boxShadow: `0px 0px 0px ${weight}px ${stroke.getColor()!.toString(stroke.getOpacity())}`
            };
            case StrokeAlign.INSIDE: return {
              boxShadow: `inset 0px 0px 0px ${weight}px ${stroke.getColor()!.toString(stroke.getOpacity())}`
            };
            default: return {
              borderColor: stroke.getColor()!.toString(stroke.getOpacity()),
              borderStyle: 'solid',
              borderWidth: weight
            };
          }
          
        }
      }
    }
    return {};
  }

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
        this.props.node.setPosition({
          x: data.x,
          y: data.y
        })
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
      const xPos = this.props.node.getXPos() - deltaX;
      const yPos = this.props.node.getYPos() - deltaY;
      // Set the new position based on resize direction
      if (dir === 'top' || dir === 'left' || dir === 'topLeft') {
        newNode = newNode.setPosition({
          x: xPos,
          y: yPos
        });
      } else if (dir === 'topRight') {
        newNode = newNode.setPosition({
          x: this.props.node.getXPos(),
          y: yPos
        });
      } else if (dir === 'bottomLeft') {
        newNode = newNode.setPosition({
          x: xPos,
          y: this.props.node.getYPos()
        });
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
          transform: `translate(${node.getXPos() - this.props.groupPosition!.x}px, ${node.getYPos() - this.props.groupPosition!.y}px)`,
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
          transform: `translate(${node.getXPos()}px, ${node.getYPos()}px)`,
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
          position={node.getPosition()}
          onStart={() => {
            if (this.props.onSelect) this.props.onSelect();
          }}
          onDrag={(e, data) => {
            this.dragging = true;
            e.stopPropagation();
            this.onDrag(e, data);
          }}
          onStop={(e, data) => {
            this.dragging = false;
            e.stopPropagation();
            if (this.props.onSelect) this.props.onSelect();
          }}
        >
          <Resizable
            style={{
              position: 'absolute'
            }}
            lockAspectRatio={node.shouldPreserveRatio()}
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
              if (this.props.onSelect) this.props.onSelect();
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
