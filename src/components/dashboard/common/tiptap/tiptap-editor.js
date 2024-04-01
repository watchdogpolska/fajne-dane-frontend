import React from 'react'
import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import Link from '@tiptap/extension-link'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Placeholder from '@tiptap/extension-placeholder'


import {Toolbar} from './toolbar'
import {Popover} from './popover'


export const Tiptap = ({
    content = '',
    editable = true,
    placeholder = "Type '/' for actions…",
    withTypographyExtension = false,
    withLinkExtension = false,
    withCodeBlockLowlightExtension = false,
    withTaskListExtension = false,
    withPlaceholderExtension = false,
    onContentUpdate,
}) => {
    const extensions = [
        StarterKit.configure({
            ...(withCodeBlockLowlightExtension && { codeBlock: false }),
        }),
    ]

    if (withTypographyExtension) {
        extensions.push(Typography)
    }

    if (withLinkExtension) {
        extensions.push(
            Link.configure({
                linkOnPaste: false,
                openOnClick: false,
            }),
        )
    }

    if (withTaskListExtension) {
        extensions.push(TaskList, TaskItem)
    }

    if (withPlaceholderExtension) {
        extensions.push(
            Placeholder.configure({
                placeholder,
            }),
        )
    }

    const [editorHtmlContent, setEditorHtmlContent] = React.useState(content.trim())

    const editor = useEditor({
        content,
        extensions,
        editable,
        onUpdate: ({ editor }) => {
            let contentHtml = editor.getHTML();
            setEditorHtmlContent(contentHtml)
            onContentUpdate(contentHtml);
        },
    })

    if (!editor) {
        return null
    }

    return (
        <>
            <div className="WhiteCard">
                <Toolbar editor={editor} />
                <Popover editor={editor} />
                <EditorContent editor={editor} />
            </div>
        </>
    )
};
