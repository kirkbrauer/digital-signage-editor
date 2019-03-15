import { CSSProperties } from 'react';
import { RectangleNode } from '../model/immutable';
import NodeComponent from './NodeComponent';
export default class Rectangle extends NodeComponent<RectangleNode> {
    protected getCornerStyle(cornerRadius: number | null, cornerRadii: number[]): CSSProperties;
    renderContent(): JSX.Element;
}
