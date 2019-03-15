import { Component, CSSProperties } from 'react';
import { Node, ColorStop, GradientType, ImageScaleMode, ImageRepeatMode, StrokeAlign, Vector } from '../model/immutable';
import { Fill } from '../model/immutable/Fill';
export interface NodeProps<T extends Node> {
    node: T;
    inGroup?: boolean;
    groupPosition?: Vector;
    selected?: boolean;
    onSelect?: () => void;
    onDeselect?: () => void;
    onChange?: (node: Node) => void;
}
declare abstract class NodeComponent<T extends Node, S = {}, SS = any> extends Component<NodeProps<T>, S, SS> {
    protected getGradientTypeString(gradientType?: GradientType): string;
    protected getGradientString(gradientStops: ColorStop[], gradientAngle: number | null, gradientType: GradientType | null, fillOpacity: number): string;
    protected getScaleModeString(scaleMode: ImageScaleMode | null): string | undefined;
    protected getRepeatModeString(repeatMode: ImageRepeatMode | null): string | undefined;
    protected getFillStyle(fill: Fill | null): CSSProperties;
    protected getStrokeStyle(stroke: Fill | null, weight: number | null, align: StrokeAlign | null): CSSProperties;
    protected abstract renderContent(): JSX.Element;
    private onSelect;
    private onDragStop;
    private onResize;
    render(): JSX.Element;
}
export default NodeComponent;
