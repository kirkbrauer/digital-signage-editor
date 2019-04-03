import React, { Component } from 'react';
import { SelectionBox as ImmutableSelectionBox } from '../model/immutable';

export interface SelectionBoxProps {
  box: ImmutableSelectionBox;
}

export default class SelectionBox extends Component<SelectionBoxProps> {

  render() {
    const box = this.props.box;
    return (
      <div style={{
        transform: `translate(${box.getX()}px, ${box.getY()}px)`,
        height: box.getHeight(),
        width: box.getWidth(),
        position: 'absolute',
        backgroundColor: 'rgba(66, 104, 255, 0.3)'
      }}/>
    );
  }
  
}
