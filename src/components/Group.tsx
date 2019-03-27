import React from 'react';
import { GroupNode } from '../model/immutable';
import NodeComponent from './NodeComponent';
import Node from './Node';

export default class Group extends NodeComponent<GroupNode> {

  public renderStaticContent() {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {this.props.node.getNodes().map(node => (
          <Node
            key={node.getID()}
            node={node}
            inGroup={true}
            groupPosition={this.props.node.getPosition()}
          />
        ))}
      </div>
    );
  }

}
