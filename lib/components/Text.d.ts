/// <reference types="react" />
import { TextNode } from '../model/immutable';
import NodeComponent from './NodeComponent';
export default class Text extends NodeComponent<TextNode> {
    private editorRef;
    componentDidMount(): void;
    renderEditableContent(): JSX.Element;
    renderStaticContent(): JSX.Element;
    private renderContent;
}
