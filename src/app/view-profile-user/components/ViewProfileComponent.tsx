// "use client";

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { getDataProfilePublic } from '@/app/view-profile-user/lib/viewProfile';
// import { useUserApprovalToken } from '@/hooks/use-approval-token';

// interface ProfileData {
//   id: string;
//   full_name: string;
//   avatar_url: string;
//   email?: string;
//   phone?: string;
//   bio: string;
//   country: string;
//   city: string;
//   department: string;
//   location: string;
//   created_at: string;
//   user_profile_preferences: {
//     profile_public: boolean;
//     allow_email: boolean;
//     allow_whatsapp: boolean;
//   };
//   questions: { count: number }[];
//   question_comments: { count: number }[];
// }

// interface ViewProfileProps {
//   targetUserId: string;
// }

// export function ViewProfileComponent({ targetUserId }: ViewProfileProps) {
//   const { token, hasValidToken } = useUserApprovalToken();
//   const [profileData, setProfileData] = useState<ProfileData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!token || !hasValidToken) {
//         setError('Token de autorización no disponible');
//         setLoading(false);
//         return;
//       }

//       try {
//         const result = await getDataProfilePublic({ 
//           userId: targetUserId, 
//         //   aprob: token 
//         });

//         if (result.success && result.data) {
//           setProfileData(result.data);
//           setError(null);
//         } else {
//           setError(result.message || 'Error desconocido');
//         }
//       } catch (err) {
//         setError('Error al cargar el perfil');
//         console.error('Error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [targetUserId, token, hasValidToken]);

//   if (loading) {
//     return <div>Cargando perfil...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!profileData) {
//     return <div>No se encontraron datos del perfil</div>;
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <Image 
//           src={profileData.avatar_url} 
//           alt={profileData.full_name}
//           width={100}
//           height={100}
//           className="profile-avatar"
//         />
//         <h1>{profileData.full_name}</h1>
//         <p>{profileData.bio}</p>
//       </div>

//       <div className="profile-info">
//         <div className="location">
//           <h3>Ubicación</h3>
//           <p>{profileData.city}, {profileData.department}</p>
//           <p>{profileData.country}</p>
//         </div>

//         <div className="stats">
//           <h3>Estadísticas</h3>
//           <p>Preguntas: {profileData.questions[0]?.count || 0}</p>
//           <p>Comentarios: {profileData.question_comments[0]?.count || 0}</p>
//         </div>

//         {/* Información de contacto (solo si está disponible) */}
//         {(profileData.email || profileData.phone) && (
//           <div className="contact-info">
//             <h3>Contacto</h3>
//             {profileData.email && (
//               <p>Email: {profileData.email}</p>
//             )}
//             {profileData.phone && (
//               <p>Teléfono: {profileData.phone}</p>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="profile-preferences">
//         <h3>Preferencias de privacidad</h3>
//         <p>Perfil público: {profileData.user_profile_preferences.profile_public ? 'Sí' : 'No'}</p>
//         <p>Permite contacto por email: {profileData.user_profile_preferences.allow_email ? 'Sí' : 'No'}</p>
//         <p>Permite contacto por WhatsApp: {profileData.user_profile_preferences.allow_whatsapp ? 'Sí' : 'No'}</p>
//       </div>
//     </div>
//   );
// }

// // Ejemplo de uso del componente
// export function ExampleUsage() {
//   const targetUserId = 'ejemplo-user-id';
  
//   return (
//     <div>
//       <h1>Perfil de Usuario</h1>
//       <ViewProfileComponent targetUserId={targetUserId} />
//     </div>
//   );
// }
