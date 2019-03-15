import React, { CSSProperties } from 'react';
import { RectangleNode } from '../model/immutable';
import NodeComponent from './NodeComponent';

export default class Rectangle extends NodeComponent<RectangleNode> {

  protected getCornerStyle(cornerRadius: number | null, cornerRadii: number[]): CSSProperties {
    if (cornerRadii.length > 0) {
      return {
        borderRadius: `${cornerRadii[0] || 0}px ${cornerRadii[1] || 0}px ${cornerRadii[2] || 0}px ${cornerRadii[3] || 0}px`
      };
    }
    if (cornerRadius) {
      return {
        borderRadius: `${cornerRadius}px`
      };
    }
    return {};
  }

  public renderContent() {
    return (
      <div 
      style={{
        height: '100%',
        width: '100%',
        ...this.getFillStyle(this.props.node.fill!),
        ...this.getStrokeStyle(this.props.node.stroke!, this.props.node.strokeWeight!, this.props.node.strokeAlign),
        ...this.getCornerStyle(this.props.node.getCornerRadius(), this.props.node.getCornerRadii())
      }}/>
    );
  }

}
