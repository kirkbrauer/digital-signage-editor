import { Component } from 'react';
import { Node as ImmutableNode } from '../model/immutable';
export interface NodeProps {
    node: ImmutableNode;
    inGroup?: boolean;
    groupX?: number;
    groupY?: number;
    selected?: boolean;
    editing?: boolean;
    readOnly?: boolean;
    onStartEditing?: () => void;
    onStopEditing?: () => void;
    onSelect?: () => void;
    onDeselect?: () => void;
    onChange?: (node: ImmutableNode) => void;
}
export default class Node extends Component<NodeProps> {
    render(): JSX.Element | null;
}
