import React, { Component } from 'react';
import { Node as NodeState, RectangleNode, EllipseNode } from '../model/immutable';
import { NodeProps } from './NodeComponent';
import Rectangle from './Rectangle';
import Ellipse from './Ellipse';

export default class Node extends Component<NodeProps<NodeState>> {

  render() {
    if (this.props.node instanceof RectangleNode) {
      return <Rectangle {...this.props as NodeProps<RectangleNode>}/>;
    }
    if (this.props.node instanceof EllipseNode) {
      return <Ellipse {...this.props as NodeProps<EllipseNode>} />;
    }
    return null;
  }

}
