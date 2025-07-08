// import { useEffect } from 'react';
// import { useSession } from '@/context/context.sesion';
// import { isUserTokenValid } from '@/lib/tokenManager';

// /**
//  * Hook para manejar la validación y renovación automática del token de aprobación
//  */
// export function useApprovalToken() {
//   const { user, refreshUserToken } = useSession();

//   useEffect(() => {
//     if (!user) return;

//     // Verificar si el token es válido al montar el componente
//     if (!isUserTokenValid(user)) {
//       console.log('Token expirado, renovando...');
//       refreshUserToken();
//     }

//     // Configurar intervalo para verificar el token cada 30 minutos
//     const interval = setInterval(() => {
//       if (user && !isUserTokenValid(user)) {
//         console.log('Token expirado, renovando automáticamente...');
//         refreshUserToken();
//       }
//     }, 30 * 60 * 1000); // 30 minutos

//     return () => clearInterval(interval);
//   }, [user, refreshUserToken]);

//   return {
//     approvalToken: user?.approval_token,
//     isTokenValid: user ? isUserTokenValid(user) : false,
//     refreshToken: refreshUserToken
//   };
// }

// /**
//  * Hook para obtener el token de aprobación actual del usuario
//  */
// export function useUserApprovalToken() {
//   const { user } = useSession();
  
//   return {
//     token: user?.approval_token,
//     userId: user?.id,
//     hasValidToken: user ? isUserTokenValid(user) : false
//   };
// }
