import React, { Component, CSSProperties } from 'react';
import { Node, ColorStop, GradientType, ImageScaleMode, ImageRepeatMode, StrokeAlign, Vector } from '../model/immutable';
import { Rnd, DraggableData, ResizableDelta, Position } from 'react-rnd';
import { ResizableDirection } from 're-resizable';
import OutsideClickHandler from 'react-outside-click-handler';
import { Fill } from '../model/immutable/Fill';

export interface NodeProps<T extends Node> {
  node: T;
  inGroup?: boolean;
  groupPosition?: Vector;
  selected?: boolean;
  onSelect?: () => void;
  onDeselect?: () => void;
  onChange?: (node: Node) => void;
}

abstract class NodeComponent<T extends Node, S = {}, SS = any> extends Component<NodeProps<T>, S, SS> {

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

  protected abstract renderContent(): JSX.Element;

  private onSelect(e: React.MouseEvent) {
    if (this.props.selected) {
      e.persist();
    } else if (this.props.onSelect) {
      e.preventDefault();
      this.props.onSelect();
    }
  }

  private onDragStop(e: any, data: DraggableData) {
    if (this.props.onChange) {
      this.props.onChange(
        this.props.node.setPosition({
          x: data.x,
          y: data.y
        })
      );
    }
  }

  private onResize(e: MouseEvent | TouchEvent, dir: ResizableDirection, ref: HTMLDivElement, delta: ResizableDelta, position: Position) {
    if (this.props.onChange) {
      let newNode: Node = this.props.node;
      newNode = newNode.setWidth(ref.clientWidth);
      newNode = newNode.setHeight(ref.clientHeight);
      newNode = newNode.setPosition(position);
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
      boxShadow: '0 0 0 1px white',
      zIndex: 1000
    };
    const divStyle = {
      opacity: node.isVisible() ? node.getOpacity() : 0,
      zIndex: node.getZIndex(),
      cursor: !this.props.selected ? 'default' : 'move',
    };
    if (!this.props.inGroup) {
      return (
        <OutsideClickHandler
          onOutsideClick={() => {
            if (this.props.selected) {
              if (this.props.onDeselect) {
                this.props.onDeselect();
              }
            }
          }}
        >
          <Rnd
            style={divStyle}
            enableResizing={{
              bottom: this.props.selected,
              bottomLeft: this.props.selected,
              bottomRight: this.props.selected,
              left: this.props.selected,
              right: this.props.selected,
              top: this.props.selected,
              topLeft: this.props.selected,
              topRight: this.props.selected
            }}
            onClick={(e: React.MouseEvent) => this.onSelect(e)}
            disableDragging={!this.props.selected}
            size={{ width: node.getWidth(), height: node.getHeight() }}
            lockAspectRatio={node.shouldPreserveRatio()}
            position={node.getPosition()}
            onDragStop={(e, d) => this.onDragStop(e, d)}
            onResize={(e, direction, ref, delta, position) => this.onResize(e, direction, ref, delta, position)}
            resizeHandleStyles={this.props.selected ? {
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
            resizeHandleWrapperStyle={this.props.selected ? {
              zIndex: 1000,
              display: 'block',
              height: '100%',
              width: '100%',
              position: 'relative',
              boxShadow: 'blue 0 0 0 1px, rgba(0, 0, 255, 0.8) 0 0 1px 1px, rgba(0, 0, 255, 0.8) inset 0 0 1px 1px',
              top: '-100%'
            } : undefined}
          >
            {this.renderContent()}
          </Rnd>
        </OutsideClickHandler>
      );
    }
    return (
      <div style={{
        ...divStyle,
        transform: `translate(${node.getXPos() - this.props.groupPosition!.x}px, ${node.getYPos() - this.props.groupPosition!.y}px)`,
        height: node.getHeight(),
        width: node.getWidth(),
        position: 'absolute'
      }}>
        {this.renderContent()}
      </div>
    );
  }

}

export default NodeComponent;
