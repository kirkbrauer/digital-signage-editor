/// <reference types="react" />
import NodeComponent from './NodeComponent';
export default class Text extends NodeComponent {
    private editorRef;
    renderEditableContent(): JSX.Element;
    renderStaticContent(): JSX.Element;
    private renderContent;
}
