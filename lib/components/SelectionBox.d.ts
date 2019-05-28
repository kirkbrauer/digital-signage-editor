import { Component } from 'react';
import { SelectionBox as ImmutableSelectionBox } from '../model/immutable';
export interface SelectionBoxProps {
    box: ImmutableSelectionBox;
    insertBox?: boolean;
}
export default class SelectionBox extends Component<SelectionBoxProps> {
    render(): JSX.Element;
}
