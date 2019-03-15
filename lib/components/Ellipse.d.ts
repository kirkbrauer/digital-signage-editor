/// <reference types="react" />
import { EllipseNode } from '../model/immutable';
import NodeComponent from './NodeComponent';
export default class Ellipse extends NodeComponent<EllipseNode> {
    renderContent(): JSX.Element;
}
