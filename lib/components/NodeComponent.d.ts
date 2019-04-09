import { Component } from 'react';
import { NodeProps } from './Node';
declare abstract class NodeComponent extends Component<NodeProps> {
    protected dragging: boolean;
    protected resizing: boolean;
    protected rotating: boolean;
    protected abstract renderStaticContent(): JSX.Element;
    protected renderEditableContent(): JSX.Element;
    private onSelect;
    private onDrag;
    private onResize;
    private onRotate;
    render(): JSX.Element;
}
export default NodeComponent;
