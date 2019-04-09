import React, { Component } from 'react';
import { Node as ImmutableNode, Vector } from '../model/immutable';
import { NodeType } from '../model/raw';
import Rectangle from './Rectangle';
import Ellipse from './Ellipse';
import Text from './Text';

export interface NodeProps {
  node: ImmutableNode;
  inGroup?: boolean;
  groupPos?: Vector;
  selected?: boolean;
  readOnly?: boolean;
  onSelect?: () => void;
  onDeselect?: () => void;
  onChange?: (node: ImmutableNode) => void;
}

export default class Node extends Component<NodeProps> {

  render() {
    switch (this.props.node.type) {
      case NodeType.RECT: return <Rectangle {...this.props} />;
      case NodeType.ELLIPSE: return <Ellipse {...this.props} />;
      case NodeType.TEXT: return <Text {...this.props} />;
    }
    return null;
  }

}
