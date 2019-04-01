import React from 'react';
import NodeComponent from './NodeComponent';

export default class Rectangle extends NodeComponent {

  public renderStaticContent() {
    return (
      <div 
      style={this.props.node.toCSS()}/>
    );
  }

}
