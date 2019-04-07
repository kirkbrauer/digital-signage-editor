import React, { Component } from 'react';
import { Position, Size } from '../model/immutable';
export declare enum ResizeDirection {
    TOP = "TOP",
    RIGHT = "RIGHT",
    BOTTOM = "BOTTOM",
    LEFT = "LEFT",
    TOP_RIGHT = "TOP_RIGHT",
    TOP_LEFT = "TOP_LEFT",
    BOTTOM_RIGHT = "BOTTOM_RIGHT",
    BOTTOM_LEFT = "BOTTOM_LEFT"
}
export interface TransformerProps {
    position: Position;
    size: Size;
    rotation: number;
    disabled?: boolean;
    onResizeStart?: (e: MouseEvent | TouchEvent, size: Size, position: Position, direction: ResizeDirection) => void;
    onResize?: (e: MouseEvent | TouchEvent, size: Size, position: Position, direction: ResizeDirection) => void;
    onResizeStop?: (e: MouseEvent | TouchEvent, size: Size, position: Position, direction: ResizeDirection) => void;
    onRotateStart?: (e: MouseEvent | TouchEvent, angle: number) => void;
    onRotate?: (e: MouseEvent | TouchEvent, angle: number) => void;
    onRotateStop?: (e: MouseEvent | TouchEvent, angle: number) => void;
    onDragStart?: (e: MouseEvent | TouchEvent, position: Position) => void;
    onDrag?: (e: MouseEvent | TouchEvent, position: Position) => void;
    onDragStop?: (e: MouseEvent | TouchEvent, position: Position) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
interface TransformerState {
    tempPos: Position | null;
    tempSize: Size | null;
    tempRotation: number | null;
}
export default class Transformer extends Component<TransformerProps, TransformerState> {
    constructor(props: TransformerProps);
    private mouseDown;
    private dragging;
    private resizing;
    componentWillReceiveProps(): void;
    private calculatePosition;
    private calculateSize;
    private calculateResizePos;
    private onStartDrag;
    private onStartResize;
    render(): JSX.Element;
}
export {};
