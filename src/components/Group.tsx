import React from 'react';
import NodeComponent from './NodeComponent';
import Node from './Node';

export default class Group extends NodeComponent {

  public renderStaticContent() {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {this.props.node.nodes!.map(node => (
          <Node
            key={node.id}
            node={node}
            inGroup={true}
            groupPos={this.props.node.getPosition()}
          />
        ))}
      </div>
    );
  }

}
