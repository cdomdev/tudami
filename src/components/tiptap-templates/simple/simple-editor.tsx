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
} from "@/components/tiptap-ui-primitive/toolbar";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { LinkPopover } from "@/components/tiptap-ui/link-popover";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import { BlockQuoteButton } from "@/components/tiptap-ui/blockquote-button";

export function SimpleEditor() {
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

        <ToolbarGroup>
          <LinkPopover />
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
          <BlockQuoteButton />
          <CodeBlockButton />
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <TextAlignButton align="left" />
          <TextAlignButton align="center" />
          <TextAlignButton align="right" />
          <TextAlignButton align="justify" />
        </ToolbarGroup>
      </Toolbar>

      <div className=" border rounded-md bg-background ">
        <EditorContent
          editor={editor}
          className="prose min-w-full min-h-80 max-h-80 dark:bg-white dark:text-black p-2 w-full rounded-sm"
        />
      </div>
    </EditorContext.Provider>
  );
}
