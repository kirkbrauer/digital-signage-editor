import React, { Component } from 'react';
import { SelectionBox as ImmutableSelectionBox } from '../model/immutable';

export interface SelectionBoxProps {
  box: ImmutableSelectionBox;
}

export default class SelectionBox extends Component<SelectionBoxProps> {

  render() {
    const box = this.props.box;
    const boxPosition = box.getPosition();
    const boxSize = box.getSize()
    return (
      <div style={{
        transform: `translate(${boxPosition.x}px, ${boxPosition.y}px)`,
        width: boxSize.width,
        height: boxSize.height,
        position: 'absolute',
        backgroundColor: 'rgba(66, 104, 255, 0.3)'
      }}/>
    );
  }
  
}
