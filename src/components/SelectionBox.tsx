import React, { Component } from 'react';
import { SelectionBox as ImmutableSelectionBox } from '../model/immutable';

export interface SelectionBoxProps {
  box: ImmutableSelectionBox;
  insertBox?: boolean;
}

export default class SelectionBox extends Component<SelectionBoxProps> {

  render() {
    const box = this.props.box;
    const boxPosition = box.getPosition();
    const boxSize = box.getSize();
    let style: any;
    if (this.props.insertBox) {
      style = {
        borderColor: 'black',
        borderStyle: 'inset',
        borderWidth: 1
      };
    } else {
      style = {
        backgroundColor: 'rgba(66, 104, 255, 0.3)'
      };
    }
    return (
      <div style={{
        transform: `translate(${boxPosition.x}px, ${boxPosition.y}px)`,
        width: boxSize.width,
        height: boxSize.height,
        position: 'absolute',
        ...style
      }}/>
    );
  }
  
}
