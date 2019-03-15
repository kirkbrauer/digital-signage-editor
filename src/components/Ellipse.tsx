import React from 'react';
import { EllipseNode } from '../model/immutable';
import NodeComponent from './NodeComponent';

export default class Ellipse extends NodeComponent<EllipseNode> {

  public renderContent() {
    return (
      <div style={{
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        ...this.getFillStyle(this.props.node.fill!),
        ...this.getStrokeStyle(this.props.node.stroke, this.props.node.strokeWeight, this.props.node.strokeAlign)
      }}/>
    );
  }

}
