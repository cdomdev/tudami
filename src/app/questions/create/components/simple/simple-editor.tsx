"use client";

import * as React from "react";
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Highlight } from "@tiptap/extension-highlight";
import { TextAlign } from "@tiptap/extension-text-align";
import { Link } from "@tiptap/extension-link";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Typography } from "@tiptap/extension-typography";

// --- UI Components ---
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/app/questions/create/components/tiptap-ui-primitive/toolbar";
import { MarkButton } from "@/app/questions/create/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/app/questions/create/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/app/questions/create/components/tiptap-ui/undo-redo-button";

// import { LinkPopover } from "@/app/create-questions/components/tiptap-ui/link-popover";
// import { ListDropdownMenu } from "@/app/create-questions/components/tiptap-ui/list-dropdown-menu";
// import { BlockQuoteButton } from "@/app/create-questions/components/tiptap-ui/blockquote-button";
// import { CodeBlockButton } from "@/app/create-questions/components/tiptap-ui/code-block-button";

export function SimpleEditor({
  onChange,
}: {
  onChange?: (html: string) => void;
}) {
  const editor = useEditor({
    editorProps: {
      attributes: {
        autocomplete: "on",
        autocorrect: "on",
        autocapitalize: "off",
        "aria-label": "Área principal de redacción",
      },
    },
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Subscript,
      Superscript,
      Typography,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) {
        onChange(html);
      }
    },
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      <Toolbar className="text-black">
        <ToolbarGroup>
          <UndoRedoButton action="undo" />
          <UndoRedoButton action="redo" />
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          <MarkButton type="underline" />
          <MarkButton type="strike" />
          <MarkButton type="code" />
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* <ToolbarGroup>
          <LinkPopover />
        </ToolbarGroup> */}

        <ToolbarSeparator />

        {/* <ToolbarGroup>
          <ListDropdownMenu types={[
            // "bulletList", 
            // "orderedList",
            "taskList"]} />
          <BlockQuoteButton />
          <CodeBlockButton />
        </ToolbarGroup> */}

        <ToolbarSeparator />

        <ToolbarGroup>
          <TextAlignButton align="left" />
          <TextAlignButton align="center" />
          <TextAlignButton align="right" />
          <TextAlignButton align="justify" />
        </ToolbarGroup>
      </Toolbar>

      <EditorContent
        editor={editor}
        className="border p-2 rounded-sm bg-slate-50 dark:bg-white text-black focus:outline-none"
      />
    </EditorContext.Provider>
  );
}
