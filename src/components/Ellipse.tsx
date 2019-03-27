import React from 'react';
import { EllipseNode } from '../model/immutable';
import NodeComponent from './NodeComponent';

export default class Ellipse extends NodeComponent<EllipseNode> {

  public renderStaticContent() {
    return (
      <div style={{
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        ...this.getFillStyle(this.props.node.getFill()),
        ...this.getStrokeStyle(this.props.node.getStroke(), this.props.node.getStrokeWeight(), this.props.node.getStrokeAlign()),
      }}/>
    );
  }

}
