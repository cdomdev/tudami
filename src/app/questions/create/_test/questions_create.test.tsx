import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Editor from "../components/Editor";
import "@testing-library/jest-dom";
import { toast } from "sonner";
import { setMockUser, setupRouterMock } from "../_test";

// Mock toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../lib/createQuestions", () => ({
  createQuestionApi: vi.fn(),
}));

import * as service from "../lib/createQuestions";
// import { useRouter } from "next/navigation";

// Mock editor
vi.mock("@/components/ui/editor/simple/simple-editor", () => ({
  SimpleEditor: ({ onChange }: { onChange: (value: string) => void }) => {
    return (
      <textarea
        aria-label="Escribe tu pregunta con detalle"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Editor mock"
      />
    );
  },
}));

// // Mock MultiSelect
vi.mock("../components/multi-select", () => ({
  MultiSelect: ({
    onValueChange,
    options,
  }: {
    onValueChange: (value: string[]) => void;
    options: Array<{ value: string; label: string }>;
  }) => {
    return (
      <select
        aria-label="Selecciona etiquetas relevantes"
        multiple
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions).map(
            (opt) => opt.value
          );
          onValueChange(selected);
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  },
}));

describe("Editor - Flujo de creación de pregunta", () => {
  // const mockPush = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    setMockUser({ full_name: "test", email: "test@mail.com" });
    setupRouterMock();
  });

  // ✅ TEST 1: Renderizado inicial
  it("debe renderizar todos los campos correctamente", () => {
    render(<Editor />);

    expect(
      screen.getByLabelText(/Dale un título claro a tu pregunta/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Selecciona etiquetas relevantes/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Escribe tu pregunta con detalle/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Enviar mi pregunta/i })
    ).toBeInTheDocument();
  });

  // ✅ TEST 2: Sin sesión
  it("debe mostrar error si no hay sesión al intentar enviar", async () => {
    setMockUser(null);
    const user = userEvent.setup();

    // ⚠️ Re-importar después de cambiar el mock
    const { default: EditorNoSession } = await import("../components/Editor");

    render(<EditorNoSession />);

    const button = screen.getByRole("button", { name: /enviar mi pregunta/i });
    await user.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Debes iniciar sesión para enviar una pregunta."
      );
      expect(service.createQuestionApi).not.toHaveBeenCalled();
    });
  });

  // ✅ TEST 3: Validación de contenido vacío
  it("debe mostrar error si el contenido está vacío", async () => {
    setMockUser({ full_name: "test", email: "test@mail.com" });

    const user = userEvent.setup();
    render(<Editor />);

    const titleInput = screen.getByLabelText(/Dale un título claro/i);
    const content = screen.getByLabelText(/Escribe tu pregunta/i);

    await user.type(titleInput, "Test Question");
    await user.type(content, "Contest Question test");

     const button = screen.getByRole("button", { name: /enviar mi pregunta/i });
    await user.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  // ✅ TEST 4: Envío exitoso
  // it("debe enviar la pregunta correctamente con todos los datos válidos", async () => {
  //   const user = userEvent.setup();
  //   const mockCreateQuestionApi = vi.mocked(service.createQuestionApi);

  //   mockCreateQuestionApi.mockResolvedValueOnce({
  //     success: true,
  //     data: {
  //       title: "Test Question",
  //       content: "Contenido de prueba",
  //       tags: ["Programación", "React"],
  //     },
  //     datainsignia: null,
  //   });

  //   render(<Editor />);

  //   // Llenar título
  //   await user.type(
  //     screen.getByLabelText(/Dale un título claro/i),
  //     "Test Question"
  //   );

  //   // Llenar contenido
  //   await user.type(
  //     screen.getByLabelText(/Escribe tu pregunta con detalle/i),
  //     "Contenido de prueba"
  //   );

  //   // Seleccionar tags
  //   const tagSelect = screen.getByLabelText(/Selecciona etiquetas relevantes/i);
  //   await user.selectOptions(tagSelect, ["Programación", "React"]);

  //   // Enviar
  //   await user.click(screen.getByRole("button", { name: /Enviar mi pregunta/i }));

  //   await waitFor(() => {
  //     expect(service.createQuestionApi).toHaveBeenCalledWith(
  //       "Test Question",
  //       "Contenido de prueba",
  //       ["Programación", "React"]
  //     );

  //     expect(toast.success).toHaveBeenCalledWith(
  //       "¡Pregunta publicada con éxito!"
  //     );

  //     expect(mockPush).toHaveBeenCalledWith(
  //       "/questions/create/status?res=pregunta-creada-con-exito"
  //     );
  //   });
  // });

  // ✅ TEST 6: Estado de carga
  // it("debe mostrar estado de carga y deshabilitar el botón durante el envío", async () => {
  //   const user = userEvent.setup();
  //   const mockCreateQuestionApi = vi.mocked(service.createQuestionApi);

  //   // Simular un delay en la API
  //   mockCreateQuestionApi.mockImplementation(
  //     () => new Promise((resolve) => setTimeout(() => resolve({
  //       success: true,
  //       data: { title: "", content: "", tags: [] },
  //       datainsignia: null,
  //     }), 100))
  //   );

  //   render(<Editor />);

  //   // Llenar campos
  //   await user.type(
  //     screen.getByLabelText(/Dale un título claro a tu pregunta/i),
  //     "Test"
  //   );
  //   await user.type(
  //     screen.getByLabelText(/Escribe tu pregunta con detalle/i),
  //     "Content"
  //   );

  //   const button = screen.getByRole("button", { name: /enviar mi pregunta/i });
  //   await user.click(button);

  //   // Verificar estado de carga
  //   expect(button).toBeDisabled();
  //   expect(screen.getByText(/Enviando pregunta/i)).toBeInTheDocument();

  //   // Esperar a que termine
  //   await waitFor(() => {
  //     expect(button).not.toBeDisabled();
  //   });
  // });

  // ✅ TEST 7: Manejo de errores de API
  // it("debe mostrar error cuando la API falla", async () => {
  //   const user = userEvent.setup();
  //   const mockCreateQuestionApi = vi.mocked(service.createQuestionApi);

  //   mockCreateQuestionApi.mockRejectedValueOnce(
  //     new Error("Error de servidor")
  //   );

  //   render(<Editor />);

  //   await user.type(
  //     screen.getByLabelText(/Dale un título claro a tu pregunta/i),
  //     "Test Question"
  //   );
  //   await user.type(
  //     screen.getByLabelText(/Escribe tu pregunta con detalle/i),
  //     "Contenido de prueba"
  //   );

  //   const button = screen.getByRole("button", { name: /enviar mi pregunta/i });
  //   await user.click(button);

  //   await waitFor(() => {
  //     expect(toast.error).toHaveBeenCalledWith(
  //       "Error al enviar la pregunta. Por favor, inténtalo de nuevo más tarde."
  //     );
  //     expect(mockPush).not.toHaveBeenCalled();
  //   });
  // });

  // // ✅ TEST 8: Limpiar campos después del envío exitoso
  // it("debe limpiar los campos después de un envío exitoso", async () => {
  //   const user = userEvent.setup();
  //   const mockCreateQuestionApi = vi.mocked(service.createQuestionApi);

  //   mockCreateQuestionApi.mockResolvedValueOnce({
  //     success: true,
  //     data: { title: "", content: "", tags: [] },
  //     datainsignia: null,
  //   });

  //   render(<Editor />);

  //   const titleInput = screen.getByLabelText(
  //     /Dale un título claro a tu pregunta/i
  //   ) as HTMLInputElement;
  //   const contentEditor = screen.getByLabelText(
  //     /Escribe tu pregunta con detalle/i
  //   ) as HTMLTextAreaElement;

  //   await user.type(titleInput, "Test Question");
  //   await user.type(contentEditor, "Contenido de prueba");

  //   const button = screen.getByRole("button", { name: /enviar mi pregunta/i });
  //   await user.click(button);

  //   await waitFor(() => {
  //     expect(titleInput.value).toBe("");
  //     expect(contentEditor.value).toBe("");
  //   });
  // });

  // // ✅ TEST 9: Response con success: false
  // it("debe manejar respuesta no exitosa de la API", async () => {
  //   const user = userEvent.setup();
  //   const mockCreateQuestionApi = vi.mocked(service.createQuestionApi);

  //   mockCreateQuestionApi.mockResolvedValueOnce({
  //     success: false,
  //     data: null,
  //     datainsignia: null,
  //   });

  //   render(<Editor />);

  //   await user.type(
  //     screen.getByLabelText(/Dale un título claro a tu pregunta/i),
  //     "Test Question"
  //   );
  //   await user.type(
  //     screen.getByLabelText(/Escribe tu pregunta con detalle/i),
  //     "Contenido de prueba"
  //   );

  //   const button = screen.getByRole("button", { name: /enviar mi pregunta/i });
  //   await user.click(button);

  //   await waitFor(() => {
  //     expect(toast.error).toHaveBeenCalledWith(
  //       "Error al enviar la pregunta. Por favor, inténtalo de nuevo más tarde."
  //     );
  //   });
  // });
});
