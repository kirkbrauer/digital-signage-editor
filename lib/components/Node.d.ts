import { Component } from 'react';
import { Node as NodeState } from '../model/immutable';
import { NodeProps } from './NodeComponent';
export default class Node extends Component<NodeProps<NodeState>> {
    render(): JSX.Element | null;
}
