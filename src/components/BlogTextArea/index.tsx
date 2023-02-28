import React from 'react';
import dynamic from 'next/dynamic'
import { EditorState } from 'draft-js';
import { EditorProps } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

interface BlogTextAreaInterface {
    options: string[],
    inline: { inDropdown: boolean },
    list?: { inDropdown: boolean },
    textAlign: { inDropdown: boolean },
    link?: { inDropdown: boolean },
    history: { inDropdown: boolean },
    currentState: EditorState,
    setCurrentState: React.Dispatch<React.SetStateAction<EditorState>>
}

export default function BlogTextArea({ options, inline, textAlign, history, list, link, currentState, setCurrentState }: BlogTextAreaInterface) {

    return (
        <div>
            <Editor
                editorState={currentState}
                toolbarClassName="toolbar-class"
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbar={{
                    options,
                    inline,
                    textAlign,
                    history,
                    list,
                    link,
                }}
                onEditorStateChange={setCurrentState}
            />
        </div>
    )
}

