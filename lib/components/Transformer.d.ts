import React, { Component } from 'react';
import { Vector, Size } from '../model/immutable';
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
    position: Vector;
    size: Size;
    rotation: number;
    disabled?: boolean;
    disableRotation?: boolean;
    disableResize?: boolean;
    disableDrag?: boolean;
    onResizeStart?: (e: MouseEvent | TouchEvent, size: Size, position: Vector, direction: ResizeDirection) => void;
    onResize?: (e: MouseEvent | TouchEvent, size: Size, position: Vector, direction: ResizeDirection) => void;
    onResizeStop?: (e: MouseEvent | TouchEvent, size: Size, position: Vector, direction: ResizeDirection) => void;
    onRotateStart?: (e: MouseEvent | TouchEvent, angle: number) => void;
    onRotate?: (e: MouseEvent | TouchEvent, angle: number) => void;
    onRotateStop?: (e: MouseEvent | TouchEvent, angle: number) => void;
    onDragStart?: (e: MouseEvent | TouchEvent, position: Vector) => void;
    onDrag?: (e: MouseEvent | TouchEvent, position: Vector) => void;
    onDragStop?: (e: MouseEvent | TouchEvent, position: Vector) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
interface TransformerState {
    tempPos: Vector | null;
    tempSize: Size | null;
    tempRotation: number | null;
}
export default class Transformer extends Component<TransformerProps, TransformerState> {
    constructor(props: TransformerProps);
    private mouseDown;
    private dragging;
    private resizing;
    private rotating;
    componentWillReceiveProps(): void;
    /**
     * Returns the center position of the transformer.
     */
    private getCenterPosition;
    /**
     * Returns the angle based on the cursor start position and the end position.
     * @param pos1 The start position of the cursor.
     * @param pos2 The end position of the cursor.
     */
    private calculateAngle;
    private calculatePosition;
    private calculateSize;
    private calculateResizePos;
    private onStartDrag;
    private onStartResize;
    private onStartRotate;
    render(): JSX.Element;
}
export {};
