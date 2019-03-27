import { Component } from 'react';
import { EditorState } from './model/immutable';
declare type OnChangeEvent = (editorState: EditorState) => void;
interface EditorProps {
    editorState: EditorState;
    onChange?: OnChangeEvent;
    width?: number;
    height?: number;
}
interface TempEditorState {
    keysPressed: string[];
}
export default class Editor extends Component<EditorProps, TempEditorState> {
    constructor(props: EditorProps);
    private keyDownListener;
    private keyUpListener;
    private onKeyDown;
    private onKeyUp;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private onSelectionGroupNodeChange;
    private onNodeChange;
    private onSelect;
    private onStartEditing;
    private onStopEditing;
    private onDeselect;
    private onEditorClick;
    render(): JSX.Element;
}
export {};
