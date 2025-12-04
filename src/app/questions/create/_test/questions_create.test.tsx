import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Editor from "../components/Editor";
import "@testing-library/jest-dom";
import { toast } from "sonner";
import { setMockUser, setupRouterMock } from "@/_test/__mocks__";

vi.mock("../lib/createQuestions", () => ({
  createQuestionApi: vi.fn(),
}));


import * as service from "../lib/createQuestions";

describe("Editor - Flujo de renderizado editor", () => {
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
      screen.getByText(/Selecciona etiquetas relevantes/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Escribe tu pregunta con detalle/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Enviar mi pregunta/i })
    ).toBeInTheDocument();
  });

  // // ✅ TEST 2: Sin sesión
  it("debe mostrar error si no hay sesión al intentar enviar", async () => {
    setMockUser(null);
    const user = userEvent.setup();

    // ⚠️ Re-importar después de cambiar el mock
    const { default: EditorNoSession } = await import("../components/Editor");

    render(<EditorNoSession />);

    const button = screen.getByRole("button", { name: /enviar mi pregunta/i });
    await user.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
      expect(service.createQuestionApi).not.toHaveBeenCalled();
    });
  });

  // // ✅ TEST 3: Validación de contenido vacío
  it("debe mostrar error al enviar si el contenido está vacío", async () => {
    setMockUser({ full_name: "test", email: "test@mail.com" });

    const user = userEvent.setup();
    render(<Editor />);

    const titleInput = screen.getByLabelText(/Dale un título claro/i);
    const content = screen.getByText(/Escribe tu pregunta/i);

    await user.type(titleInput, "Test Question");
    await user.type(content, "Contest Question test");

    const button = screen.getByRole("button", { name: /enviar mi pregunta/i });
    await user.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
