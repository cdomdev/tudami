export async function getDataProfilePublic({ userId }: { userId: string }) {
  try {
    const url = `/api/view-profile/info?id=${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log("Data fetched:", data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Error al obtener perfil",
      };
    }

    // Obtener las preferencias del usuario (puede ser array u objeto)
    const preferencesRaw = data.user_profile_preferences;
    const preferences = Array.isArray(preferencesRaw)
      ? preferencesRaw[0]
      : preferencesRaw;

    if (!preferences || !preferences.profile_public) {
      return { success: false, message: "Este perfil no es público" };
    }

    return { data, success: true };
  } catch (error) {
    console.error("Error obteniendo perfil público:", error);
    return { success: false, message: "Error interno del servidor" };
  }
}

/**
 * Valida el token de aprobación.
 */
export async function validateTokenApproval(token: string): Promise<boolean> {
  const tokenResponse = await fetch("/api/validate-token-aprov", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  return tokenResponse.ok;
}
