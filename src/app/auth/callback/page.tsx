"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/context/context.sesion";
import { Spinner } from "@/components/Spiner";
import { getUserProfileQuery } from "@/lib/query";

export default function AuthCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const { setUser } = useSession();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.error("Error al obtener sesión:", error);
        return;
      }

      const { session } = data;
      const accessToken = session.access_token;

      await fetch("/api/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: accessToken }),
      });

      //  Zustand
      const { id, email, user_metadata, app_metadata } = session.user;
      const full_name = user_metadata?.full_name || user_metadata?.name || "";
      const avatar_url = user_metadata?.avatar_url || "";
      const provider = app_metadata?.provider || "email";

      // Generar token de aprobación usando la API
      const tokenResponse = await fetch("/api/generate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      });

      if (!tokenResponse.ok) {
        console.error("Error al generar token de aprobación");
        return;
      }

      const { token: tokenApproval } = await tokenResponse.json();

      // Insertar/actualizar usuario en la tabla users
      const { error: upsertError, data: upsertedUser } = await supabase
        .from("users")
        .upsert({
          id,
          email,
          full_name,
          avatar_url,
          provider,
          country: "Colombia",
          approval_token: tokenApproval,
        })
        .select()
        .single();

      if (upsertError) {
        console.error("Error al insertar usuario:", upsertError.message);
      }

      /**
       * Actulizar preferncias de usuarios por default, perfil publico y datos de contacto privado
       */
      const { error: updateError } = await supabase.from("user_profile_preferences").upsert({
        user_id: id,
        profile_public: true,
        allow_email: false,
        allow_whatsapp: false,
      })


      if (updateError) console.error("Erro al intregrar las preferncias del usuario:", updateError)

      const { data: userProfile } = await getUserProfileQuery(id);

      if (!userProfile) {
        console.error("Error obteniendo perfil:", error);
        return;
      }

      /**
       * Setear usuario con preferencias en el contexto
       */
      
      setUser({
        id,
        email: email || "",
        full_name,
        avatar_url,
        provider,
        phone: upsertedUser?.phone ?? "",
        bio: upsertedUser?.bio ?? "",
        city: userProfile?.city ?? "",
        department: userProfile?.department ?? "",
        country: userProfile?.country ?? "Colombia",
        approval_token: upsertedUser?.approval_token ?? "",
        created_at: upsertedUser?.created_at ?? new Date().toISOString(),
        profile_public:
          userProfile?.user_profile_preferences?.profile_public ?? true,
        allow_email:
          userProfile?.user_profile_preferences?.allow_email ?? false,
        allow_whatsapp:
          userProfile?.user_profile_preferences?.allow_whatsapp ?? false,
        reputation: {
          questions: userProfile.questions?.[0]?.count ?? 0,
          responses: userProfile.question_comments?.[0]?.count ?? 0,
          score: "bronze",
          achievement: {
            achievement_id:
              userProfile.user_achievements?.[0]?.achievement_id ?? null,
          },
        },
      });

      const redirect = params.get("redirectTo") || "/";
      router.replace(redirect);
    };

    handleAuth();
  }, [router, params, setUser]);

  return (
    <div className="min-h-screen grid place-content-center text-center ">
      <Spinner className="w-7 h-7 inline-flex mx-auto" />
      <p className="text-lg">Autenticando…</p>
    </div>
  );
}
