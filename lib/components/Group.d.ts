/// <reference types="react" />
import { GroupNode } from '../model/immutable';
import NodeComponent from './NodeComponent';
export default class Group extends NodeComponent<GroupNode> {
    renderContent(): JSX.Element;
}
