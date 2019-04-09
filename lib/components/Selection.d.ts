import { Component } from 'react';
import { List } from 'immutable';
import { Node, Vector, Size } from '../model/immutable';
export interface SelectionProps {
    nodes: List<Node>;
    onChange: (nodes: List<Node>) => void;
}
interface SelectionState {
    position: Vector;
    size: Size;
}
export default class Selection extends Component<SelectionProps, SelectionState> {
    constructor(props: SelectionProps);
    componentWillReceiveProps(props: SelectionProps): void;
    private onDrag;
    private onResize;
    render(): JSX.Element;
}
export {};
