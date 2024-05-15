'use client';
import { type Editor } from "@tiptap/react";
import Button from "../Button";
import icons from "@/lib/icons";

export default function Toolbar({ editor }: { editor: Editor|null }) {

    if (!editor) return null

    return (
      <div className="flex gap-2 flex-wrap items-center bg-white/10 p-2 rounded-tr-md rounded-tl-md border border-white/10">
        <Button
          active={editor.isActive("bold")}
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          {icons.bold}
        </Button>

        <Button
          active={editor.isActive("italic")}
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          {icons.italic}
        </Button>

        <Button
          active={editor.isActive("strike")}
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          {icons.strikethrough}
        </Button>

        <Button
          active={editor.isActive("code")}
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          {icons.code}
        </Button>

        <Button
          active={editor.isActive("codeBlock")}
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          {icons.codeBlock}
        </Button>

        <Button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          {icons.horizontalRule}
        </Button>

        <Button
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          {icons.pageBreak}
        </Button>

        <Button
          type="button"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          {icons.listOrdered}
        </Button>

        <Button
          type="button"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          {icons.listUnordered}
        </Button>

        <Button
          type="button"
          onClick={() => editor.chain().focus().setTextDirection("ltr").run()}
        >
          {icons.alignLeft}
        </Button>

        <Button
          type="button"
          onClick={() => editor.chain().focus().setTextDirection("rtl").run()}
        >
          {icons.alignRight}
        </Button>

        <Button
          type="button"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
        >
          {icons.heading1}
        </Button>

        <Button
          type="button"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
        >
          {icons.heading2}
        </Button>

        <Button
          type="button"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
        >
          {icons.heading3}
        </Button>

        <Button
          type="button"
          active={editor.isActive("heading", { level: 4 })}
          onClick={() => editor.chain().focus().setHeading({ level: 4 }).run()}
        >
          {icons.heading4}
        </Button>

        <Button
          type="button"
          active={editor.isActive("heading", { level: 5 })}
          onClick={() => editor.chain().focus().setHeading({ level: 5 }).run()}
        >
          {icons.heading5}
        </Button>

        <Button
          type="button"
          active={editor.isActive("heading", { level: 6 })}
          onClick={() => editor.chain().focus().setHeading({ level: 6 }).run()}
        >
          {icons.heading6}
        </Button>
      </div>
    );
}