import { Component } from 'react';
import { EditorState } from './model/immutable';
declare type OnChangeEvent = (editorState: EditorState) => void;
interface EditorProps {
    editorState: EditorState;
    shift?: boolean;
    onChange?: OnChangeEvent;
    width?: number;
    height?: number;
    readOnly?: boolean;
}
export default class Editor extends Component<EditorProps> {
    private setEditorState;
    private getEditorState;
    private onSelectionChange;
    private onNodeChange;
    private onSelect;
    private onStartEditing;
    private onStopEditing;
    private onDeselect;
    private onEditorClick;
    render(): JSX.Element;
}
export {};
