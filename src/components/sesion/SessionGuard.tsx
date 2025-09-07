"use client";

import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useSession } from '@/context/context.sesion';

// Códigos de error relacionados con sesión expirada o inválida
const AUTH_ERROR_CODES = [
  'AUTH_ERROR',
  '401',
  'UNAUTHENTICATED',
  'PGRST301',
  'JWT expired'
];

export function SessionGuard({ children }: { children: React.ReactNode }) {
  const { refreshSession } = useAuth();
  const { isLoggedIn } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) return;
    
    // Configurar el interceptor global para todas las llamadas fetch
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        // Realizar la llamada fetch original
        const response = await originalFetch(...args);
        
        // Si la respuesta es exitosa, devolverla directamente
        if (response.ok) {
          return response;
        }
        
        // Clonar la respuesta para poder leer su cuerpo y seguir usándola
        const clonedResponse = response.clone();
        
        // Si es un error 401 (Unauthorized), intentar refrescar el token
        if (response.status === 401) {
          try {
            const responseData = await clonedResponse.json();
            
            // Verificar si es un error de autenticación
            const isAuthError = responseData.code && 
                               AUTH_ERROR_CODES.includes(responseData.code);
            
            if (isAuthError) {
              console.log("Sesión expirada detectada, intentando renovar...");
              const success = await refreshSession();
              
              if (success) {
                // Si se pudo renovar la sesión, intentar la solicitud original de nuevo
                return originalFetch(...args);
              } else {
                // Si no se pudo renovar, redirigir al login
                router.push('/auth/login');
              }
            }
          } catch (err) {
            // Si hay un error al procesar la respuesta, devolver la respuesta original
            console.error("Error al procesar respuesta de API:", err);
          }
        }
        
        // Devolver la respuesta original para otros errores
        return response;
      } catch (error) {
        // Pasar cualquier error de red al fetch original
        throw error;
      }
    };
    
    // Restaurar fetch original al desmontar el componente
    return () => {
      window.fetch = originalFetch;
    };
  }, [isLoggedIn, refreshSession, router]);
  
  return <>{children}</>;
}
