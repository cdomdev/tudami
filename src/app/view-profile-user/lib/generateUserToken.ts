// import { supabase } from "@/lib/supabase";

import { supabase } from "@/lib/supabase";

/**
 * Genera un token único para un usuario específico
 * Este token puede ser usado para autorizar el acceso a perfiles públicos
 */
export function generateUserToken(userId: string): string {
  // Implementación básica: genera un token basado en el ID del usuario
  // En producción, deberías usar algo más robusto como JWT
  const timestamp = Date.now().toString();
  const combined = `${userId}_${timestamp}`;
  
  return Buffer.from(combined).toString('base64');
}

/**
 * Función para crear/actualizar un token de usuario en la base de datos
 * Opcional: si quieres almacenar tokens en una tabla específica
 */
export async function createUserToken(userId: string, token?: string) {
  try {
    const userToken = token || generateUserToken(userId);
    
    // Ejemplo de implementación con tabla de tokens
    // Necesitarías crear una tabla 'user_tokens' en Supabase
    /*
    const { data, error } = await supabase
      .from('user_tokens')
      .upsert({
        user_id: userId,
        token: userToken,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
        is_active: true
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creando token:', error);
      return null;
    }
    
    return data.token;
    */
    
    return userToken;
  } catch (error) {
    console.error('Error generando token:', error);
    return null;
  }
}

/**
 * Función para revocar un token de usuario
 */
export async function revokeUserToken(_userId: string, _token: string) {
  try {
    console.log('Revocando token para el usuario:', _userId, 'con token:', _token);
    // Implementación con tabla de tokens
    /*
    const { error } = await supabase
      .from('user_tokens')
      .update({ is_active: false })
      .eq('user_id', userId)
      .eq('token', token);
    
    return !error;
    */
    
    // Para la implementación actual, no hay revocación
    return true;
  } catch (error) {
    console.error('Error revocando token:', error);
    return false;
  }
}

/**
 * Función para generar un token simple para compartir perfil
 * Basado en el ID del usuario
 */
export function generateShareToken(userId: string): string {
  return Buffer.from(userId).toString('base64');
}

/**
 * Función para verificar si un token de compartir es válido
 */
export async function validateShareToken(userId: string, token: string) {
  try {
   const { data } = await supabase.from('user_tokens').select('token').eq('user_id', userId).single();
   return data?.token === token;
  } catch {
    return false;
  }
}
