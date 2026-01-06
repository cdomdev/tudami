/**
 * Mock components used in tests
 */

import { vi } from "vitest";

// Mock editor
export function MockEditor() {
  vi.mock("@/components/ui/editor/simple/simple-editor", () => ({
    SimpleEditor: ({ onChange }: { onChange: (v: string) => void }) => (
      <textarea
        aria-label="Escribe tu pregunta con detalle"
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  }));
}


export function MockMultiSelect() {
  vi.mock("@/components/ui/multi-select", () => ({
    MultiSelect: ({
      onValueChange,
    }: {
      onValueChange: (value: string[]) => void;
    }) => (
      <button
        data-testid="mock-multiselect"
        onClick={() => onValueChange(["Programación", "React"])}
      >
        Mock MultiSelect
      </button>
    ),
  }));
}
