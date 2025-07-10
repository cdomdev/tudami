import { createClient } from '@supabase/supabase-js'

/**
 * Cliente de Supabase para el servidor
 * Solo debe usarse en API routes y middleware
 * Tiene permisos de administrador y bypassa RLS
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL no está configurada')
}

if (!supabaseServiceKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY no está configurada')
}

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Función helper para verificar que estamos en el servidor
export function ensureServerSide() {
  if (typeof window !== 'undefined') {
    throw new Error('Esta función solo puede ejecutarse en el servidor')
  }
}
