/**
 * Validación y configuración de variables de entorno
 */

function validateEnvVar(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Variable de entorno ${name} es requerida`);
  }
  return value;
}

export const config = {
  supabase: {
    url: validateEnvVar('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL),
    anonKey: validateEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    serviceKey: validateEnvVar('SUPABASE_SERVICE_ROLE_KEY', process.env.SUPABASE_SERVICE_ROLE_KEY),
  },
  app: {
    host: process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000',
    isDevelopment: process.env.NODE_ENV === 'development',
  }
};

// Verificar configuración al importar
try {
  // Validar que las variables estén disponibles
  if (!config.supabase.url || !config.supabase.anonKey || !config.supabase.serviceKey) {
    throw new Error('Variables de Supabase no configuradas');
  }
  console.log('✅ Variables de entorno validadas correctamente');
} catch (error) {
  console.error('❌ Error en configuración:', error);
  process.exit(1);
}
