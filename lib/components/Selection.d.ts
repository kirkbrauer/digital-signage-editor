import { Component } from 'react';
import { List } from 'immutable';
import { Node } from '../model/immutable';
export interface SelectionProps {
    nodes: List<Node>;
    onChange: (nodes: List<Node>) => void;
}
export default class Selection extends Component<SelectionProps> {
    private onDrag;
    private onResize;
    render(): JSX.Element;
}
