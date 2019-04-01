import { Component } from 'react';
import { NodeProps } from './Node';
declare abstract class NodeComponent extends Component<NodeProps> {
    protected dragging: boolean;
    protected abstract renderStaticContent(): JSX.Element;
    protected renderEditableContent(): JSX.Element;
    private onSelect;
    private onDrag;
    private onResize;
    render(): JSX.Element;
}
export default NodeComponent;
