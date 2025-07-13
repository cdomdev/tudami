// Función simple para generar token de aprobación
export function generateSimpleApprovalToken(userId: string): string {
    const timestamp = Date.now().toString();
    const randomPart = Math.random().toString(36).substring(2);
    return `${userId}-${timestamp}-${randomPart}`;
  }