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
} from "../tiptap-ui-primitive/toolbar";
import { MarkButton } from "../tiptap-ui/mark-button";
import { TextAlignButton } from "../tiptap-ui/text-align-button";
import { UndoRedoButton } from "../tiptap-ui/undo-redo-button";
import { useCurrentEditor } from "@tiptap/react";
import { LinkPopover } from "../tiptap-ui/link-popover";
import { ListDropdownMenu } from "../tiptap-ui/list-dropdown-menu";
import { BlockQuoteButton } from "../tiptap-ui/blockquote-button";
import { CodeBlockButton } from "../tiptap-ui/code-block-button";

export function SimpleEditor({
  onChange,
  isAmd,
}: {
  onChange?: (html: string) => void;
  isAmd?: boolean;
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

        {isAmd && (
          <ToolbarGroup>
            <LinkPopover />
          </ToolbarGroup>
        )}

        <ToolbarSeparator />

        {isAmd && (
          <ToolbarGroup>
            <ListDropdownMenu types={["bulletList", "orderedList"]} />
            <BlockQuoteButton />
          </ToolbarGroup>
        )}

        <ToolbarGroup>
          <CodeBlockButton />
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <TextAlignButton align="left" />
          <TextAlignButton align="center" />
          <TextAlignButton align="right" />
          <TextAlignButton align="justify" />
        </ToolbarGroup>

        {isAmd && (
          <ToolbarGroup>
            <HeadingButton />
          </ToolbarGroup>
        )}
      </Toolbar>

      <EditorContent
        editor={editor}
        className="border p-2 rounded-sm bg-slate-50 dark:bg-white text-black focus:outline-none"
      />
    </EditorContext.Provider>
  );
}

export function HeadingButton() {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <select
      onChange={(e) =>
        editor
          .chain()
          .focus()
          .setNode("heading", { level: Number(e.target.value) })
          .run()
      }
      value={
        [1, 2, 3, 4, 5, 6].find((l) =>
          editor.isActive("heading", { level: l })
        ) ?? "p"
      }
      className="font-semibold"
    >
      <option value="p" className="font-semibold">
        Normal
      </option>
      <option value="1" className="font-semibold">
        H1
      </option>
      <option value="2" className="font-semibold">
        H2
      </option>
      <option value="3" className="font-semibold">
        H3
      </option>
      <option value="4" className="font-semibold">
        H4
      </option>
      <option value="5" className="font-semibold">
        H5
      </option>
      <option value="6" className="font-semibold">
        H6
      </option>
    </select>
  );
}
