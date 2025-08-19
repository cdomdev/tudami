"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "@/context/context.sesion";
import { supabase } from "@/utils/supabase/supabaseClient";
// Tiempo antes de la expiración para refrescar el token (5 minutos)
const REFRESH_MARGIN = 5 * 60;

// Almacenamiento para tokens de refresco en curso
const REFRESH_LOCK_KEY = "auth_refresh_lock";
const REFRESH_TIMESTAMP_KEY = "auth_refresh_timestamp";

// Tiempo mínimo entre refrescos (30 segundos)
const MIN_REFRESH_INTERVAL = 30 * 1000;

export function useAuth() {
  const { user, setUser, clearUser, isLoggedIn } = useSession();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Variable para controlar que solo una petición de refresco está en curso a la vez
  const [refreshPromise, setRefreshPromise] = useState<Promise<boolean> | null>(
    null
  );

  // Función para verificar si hay un refresco de sesión en curso
  const isRefreshInProgress = useCallback(() => {
    if (typeof window === "undefined") return false;

    // Comprobar si hay un bloqueo activo y verificar su tiempo
    const lockTimestamp = localStorage.getItem(REFRESH_LOCK_KEY);
    if (lockTimestamp) {
      const lockTime = parseInt(lockTimestamp, 10);
      // Si el bloqueo es más antiguo que 30 segundos, lo consideramos expirado
      if (Date.now() - lockTime < 30000) {
        return true;
      } else {
        // Eliminar bloqueo expirado
        localStorage.removeItem(REFRESH_LOCK_KEY);
      }
    }
    return false;
  }, []);

  // Función para establecer un bloqueo de refresco
  const setRefreshLock = useCallback(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(REFRESH_LOCK_KEY, Date.now().toString());
  }, []);

  // Función para liberar el bloqueo de refresco
  const clearRefreshLock = useCallback(() => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(REFRESH_LOCK_KEY);
  }, []);

  // Función para comprobar el tiempo del último refresco
  const checkLastRefreshTime = useCallback(() => {
    if (typeof window === "undefined") return true;

    const lastRefreshTimestamp = localStorage.getItem(REFRESH_TIMESTAMP_KEY);
    if (lastRefreshTimestamp) {
      const lastRefreshTime = parseInt(lastRefreshTimestamp, 10);
      // Si ha pasado menos del intervalo mínimo, evitar el refresco
      if (Date.now() - lastRefreshTime < MIN_REFRESH_INTERVAL) {
        return false;
      }
    }
    return true;
  }, []);

  // Función para actualizar el tiempo del último refresco
  const updateLastRefreshTime = useCallback(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(REFRESH_TIMESTAMP_KEY, Date.now().toString());
  }, []);

  // Función para renovar la sesión
  const refreshSession = useCallback(async () => {
    // Evitar múltiples refrescos globales
    if (isRefreshInProgress()) {
      return true;
    }

    // Evitar refrescos demasiado frecuentes
    if (!checkLastRefreshTime()) {
      return true;
    }

    // Si ya hay una petición de refresco en curso para este componente, esperamos a que termine
    if (refreshPromise) {
      return await refreshPromise;
    }

    try {
      setIsRefreshing(true);
      setRefreshLock(); // Establecer bloqueo global
      updateLastRefreshTime(); // Actualizar timestamp del último refresco

      // Crear una nueva promesa para esta petición de refresco
      const promise = (async () => {
        try {
          // Llamar al endpoint de renovación
          const response = await fetch("/api/auth/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            cache: "no-store"
          });

          if (!response.ok) {
            const errorData = await response.json();

            // Si es un error de límite de tasa (429)
            if (response.status === 429 || errorData.code === "RATE_LIMITED") {
              console.warn("Límite de tasa excedido, esperando para reintentar");
              // No hacemos nada drástico, simplemente reportamos el error
              // La aplicación seguirá funcionando con el token actual hasta que expire
              throw new Error("Límite de tasa excedido en el refresco de token");
            }

            // Si el token de refresco ya fue utilizado o expiró, redirigimos al login
            if (
              errorData.code === "SESSION_EXPIRED" ||
              (errorData.details && errorData.details.includes("Already Used"))
            ) {
              // Limpiamos las cookies en el navegador para mayor seguridad
              if (typeof window !== "undefined") {
                document.cookie = "sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "approval_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              }

              // Limpiamos el usuario actual
              clearUser();

              // Redirigir a la página de login si estamos en el navegador
              if (typeof window !== "undefined") {
                window.location.href = "/auth/login?reason=session_expired";
              }
            }

            throw new Error(errorData.error || "Error al refrescar sesión");
          }

          const data = await response.json();
          if (data.success && data.user) {
            // Actualizar el usuario en el contexto con la información actualizada
            setUser(data.user);
          }

          return data.success;
        } catch (error) {
          console.error("Error al renovar la sesión:", error);
          return false;
        }
      })();

      // Almacenamos la promesa actual
      setRefreshPromise(promise);

      // Esperamos el resultado
      const result = await promise;
      return result;
    } catch (error) {
      console.error("Error al renovar la sesión:", error);
      return false;
    } finally {
      setIsRefreshing(false);
      // Limpiamos los indicadores de refresco
      clearRefreshLock();
      setRefreshPromise(null);
    }
  }, [setUser, refreshPromise, clearUser, isRefreshInProgress, checkLastRefreshTime, setRefreshLock, updateLastRefreshTime, clearRefreshLock]);

  // Verificar el JWT y renovar si está por expirar
  const checkAndRefreshToken = useCallback(async () => {
    try {
      // Evitar verificaciones si ya hay un refresco en curso
      if (isRefreshInProgress()) {
        return true;
      }

      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        // Si hay un error o no hay sesión, intentamos renovar una vez
        return await refreshSession();
      }

      // Verificar si el token expirará pronto
      const expiresAt = data.session?.expires_at;
      const now = Math.floor(Date.now() / 1000);

      // Si expira en menos del margen de tiempo configurado, renovar
      if (expiresAt && expiresAt - now < REFRESH_MARGIN) {
        return await refreshSession();
      }

      return true;
    } catch (error) {
      console.error("Error al verificar el token:", error);
      return false;
    }
  }, [refreshSession, isRefreshInProgress]);

  // Verificar la sesión solo cuando el usuario interactúe con la aplicación
  useEffect(() => {
    if (!isLoggedIn) return;

    const checkIfRefreshNeeded = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!data?.session) return false;

        const expiresAt = data.session.expires_at;
        const now = Math.floor(Date.now() / 1000);

        // Solo refrescar si está próximo a expirar (5 minutos)
        if (expiresAt && expiresAt - now < REFRESH_MARGIN) {
          // console.log("Token próximo a expirar, refrescando...");
          return checkAndRefreshToken();
        }


        return true;
      } catch (error) {
        console.error("Error al verificar si necesita refresco:", error);
        return false;
      }
    };

    // Verificamos solo al inicio de la aplicación o cuando el usuario vuelve a la pestaña
    checkIfRefreshNeeded();

    // Verificar cuando el usuario vuelve a enfocar la pestaña
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkIfRefreshNeeded();
      }
    };

    // Agregar el evento de visibilidad para verificar cuando el usuario vuelve a la pestaña
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isLoggedIn, checkAndRefreshToken]);

  // Logout
  const logout = async () => {
    try {
      // Llamar al endpoint de logout cuando lo tengas
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      clearUser();
      return true;
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      return false;
    }
  };

  return {
    user,
    isLoggedIn,
    isRefreshing,
    refreshSession,
    logout,
  };
}
