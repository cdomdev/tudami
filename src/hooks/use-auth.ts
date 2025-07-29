"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession, Session } from "@/context/context.sesion";

// Intervalo de verificación de token en ms (cada 5 minutos)
const TOKEN_CHECK_INTERVAL = 5 * 60 * 1000;

// Tiempo antes de la expiración para refrescar el token (10 minutos)
const REFRESH_MARGIN = 10 * 60;

export function useAuth() {
  const { user, setUser, clearUser, isLoggedIn } = useSession();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Función para renovar la sesión
  const refreshSession = useCallback(async () => {
    try {
      setIsRefreshing(true);
      
      // Llamar al endpoint de renovación
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Error al refrescar sesión");
      }
      
      const data = await response.json();
      
      if (data.success && data.user) {
        // Actualizar el usuario en el contexto con la información actualizada
        const sessionUser: Session = {
          id: data.user.id,
          email: data.user.email,
          full_name: data.user.user_metadata?.full_name || data.user.email,
          avatar_url: data.user.user_metadata?.avatar_url,
          provider: data.user.app_metadata?.provider,
          approval_token: data.user.user_metadata?.approval_token || "",
          created_at: data.user.created_at,
          profile_public: data.user.user_metadata?.profile_public,
          allow_email: data.user.user_metadata?.allow_email,
          allow_whatsapp: data.user.user_metadata?.allow_whatsapp,
          phone: data.user.user_metadata?.phone,
          bio: data.user.user_metadata?.bio,
          country: data.user.user_metadata?.country,
          city: data.user.user_metadata?.city,
          department: data.user.user_metadata?.department,
        };
        
        setUser(sessionUser);
      }
      
      return data.success;
    } catch (error) {
      console.error("Error al renovar la sesión:", error);
      return false;
    } finally {
      setIsRefreshing(false);
    }
  }, [setUser]);
  
  // Verificar el JWT y renovar si está por expirar
  const checkAndRefreshToken = useCallback(async () => {
    try {
      // Usar el cliente de Supabase existente en lugar de crear uno nuevo
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          auth: {
            autoRefreshToken: true,
            persistSession: true
          }
        }
      );
      
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        // Si hay un error o no hay sesión, intentamos renovar una vez
        return await refreshSession();
      }
      
      // Verificar si el token expirará pronto
      const expiresAt = data.session?.expires_at;
      const now = Math.floor(Date.now() / 1000);
      
      // Si expira en menos de 10 minutos, renovar
      if (expiresAt && expiresAt - now < REFRESH_MARGIN) {
        return await refreshSession();
      }
      
      return true;
    } catch (error) {
      console.error("Error al verificar el token:", error);
      return false;
    }
  }, [refreshSession]);
  
  // Verificar la sesión periódicamente
  useEffect(() => {
    if (!isLoggedIn) return;
    
    // Verificar inmediatamente al cargar
    checkAndRefreshToken();
    
    // Configurar verificación periódica
    const intervalId = setInterval(checkAndRefreshToken, TOKEN_CHECK_INTERVAL);
    
    return () => clearInterval(intervalId);
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
    logout
  };
}
