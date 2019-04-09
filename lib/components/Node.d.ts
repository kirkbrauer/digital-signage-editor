import { Component } from 'react';
import { Node as ImmutableNode, Vector } from '../model/immutable';
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
    render(): JSX.Element | null;
}
