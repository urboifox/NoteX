'use client';
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from 'lowlight';
import { useEffect } from "react";
import TextDirection from "tiptap-text-direction";
import { cn } from "@/helpers/cn";

type TiptapProps = {
    content?: string
    onChange?: (content: string) => void
    label?: string
    className?: string
}

const extensions = [
    StarterKit.configure({
        codeBlock: false,
    }),
    CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
        defaultLanguage: "javascript",
    }),
    TextDirection.configure({
        types: ["heading", "paragraph"],
    }),
    Extension.create({
        addKeyboardShortcuts() {
            return {
                // make sure Tab button doesnt blur the editor
                Tab: () => {
                    this.editor
                        .chain()
                        .sinkListItem("listItem")
                        .command(({ tr }) => {
                            tr.insertText("   ");
                            return true;
                        })
                        .run();

                    return true; // <- make sure to return true to prevent the tab from blurring.
                },
            };
        },
    }),
];


export default function Tiptap({ content, onChange, label, className }: TiptapProps) {

    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: cn("bg-white/10 outline-none border border-white/10 p-2 rounded-bl-md rounded-br-md transition-colors duration-200 min-h-60 active:border-white/20", className),
                id: "fox-editor",
                name: "content"
            }
        },
        onUpdate: ({ editor }) => {
            const syntaxHighlightedContent =
                document
                    ?.getElementById("fox-editor")
                    ?.innerHTML || editor.getHTML();
            onChange?.(syntaxHighlightedContent)
        },
    })

    // Update editor content when `content` prop changes initially
    useEffect(() => {

        if (editor?.isEmpty) {
            editor?.commands.setContent(content || "");
        }

    }, [content, editor]);

    return (
        <div className={"relative flex flex-col"}>
            <div className={"font-medium mb-2"}>{label}</div>
            <Toolbar editor={editor} />
            <EditorContent
                autoCorrect="false"
                spellCheck="false"
                editor={editor}
            />
        </div>
    )
}
