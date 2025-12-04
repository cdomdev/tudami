import { mockSupabase } from "@/_test/__mocks__";
import Page from "../login/page";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import * as auth from "../lib/auth";
import { setMockUser } from "@/_test/__mocks__";

mockSupabase();
const user = userEvent.setup();

vi.mock("../lib/auth", () => ({
  loginWithPassword: vi.fn(),
}));

describe("Login Page - Renderizado y manejo del contenido", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setMockUser({ full_name: "test", email: "test@mail.com" });
  });

  //   Test 1  - renderizado contenido de la página de login
  it("Se renderiza correctamente la página de login", () => {
    render(<Page />);
    // Título principal
    expect(
      screen.getByRole("heading", { name: /Inicia sesión en Tudami/i })
    ).toBeInTheDocument();

    // Descripción
    expect(
      screen.getByText(/Elige un proveedor para iniciar sesión/i)
    ).toBeInTheDocument();

    // Proveedores
    expect(screen.getByRole("button", { name: /Google/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Github/i })).toBeInTheDocument();

    // Formulario
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Iniciar sesión/i })
    ).toBeInTheDocument();

    // Enlace a registro
    expect(screen.getByText(/¿No tienes cuenta/i)).toBeInTheDocument();
  });

  //   test 2 - error mesnaje aparece al enviar formulario vacío
  it("Muestra mensajes de error al enviar el formulario vacío", async () => {
    render(<Page />);

    const submitButton = screen.getByRole("button", {
      name: /Iniciar sesión/i,
    });

    submitButton.click();

    await waitFor(() => {
      expect(screen.getByText(/el correo es obligatorio/i)).toBeInTheDocument();

      expect(
        screen.getByText(/la contraseña es obligatoria/i)
      ).toBeInTheDocument();
    });
  });

  //   test 3 - muestra error al ingresar correo inválido
  it("Muestra mensaje de error al ingresar un correo inválido", async () => {
    render(<Page />);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);

    const submitButton = screen.getByRole("button", {
      name: /Iniciar sesión/i,
    });

    // Ingresar correo inválido
    await user.type(emailInput, "correo-invalido");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/debe ser un correo válido/i)
      ).toBeInTheDocument();
    });
  });

  //   test 4 - no muestra errores al ingresar datos válidos

  it("No muestra mensajes de error al ingresar datos válidos", async () => {
    render(<Page />);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole("button", {
      name: /Iniciar sesión/i,
    });

    // Ingresar datos válidos
    await user.type(emailInput, "usuario@ejemplo.com");
    await user.type(passwordInput, "contraseñaSegura123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/el correo es obligatorio/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/la contraseña es obligatoria/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/debe ser un correo válido/i)
      ).not.toBeInTheDocument();
    });
  });

  //   test 5 - mensaje de error con datos inválidos
  it("Muestra error al intentar iniciar sesión con datos inválidos", async () => {
    // Mock para simular error de autenticación
    const errorMessage =
      "Los datos ingresados no son correctos, intente nuevamente";
    vi.mocked(auth.loginWithPassword).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    render(<Page />);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole("button", {
      name: /Iniciar sesión/i,
    });

    const testEmail = "usuario@ejemplo.com";
    const testPassword = "contraseñaIncorrecta";

    await user.type(emailInput, testEmail);
    await user.type(passwordInput, testPassword);
    await user.click(submitButton);

    await waitFor(() => {
      expect(auth.loginWithPassword).toHaveBeenCalledWith(
        testEmail,
        testPassword
      );

      expect(toast.error).toHaveBeenCalledWith(
        "Error: Los datos ingresados no son correctos, intente nuevamente"
      );
    });
  });
});
