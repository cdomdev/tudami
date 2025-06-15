"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/context/context.sesion";
import { useRouter } from "next/navigation";

export default function SessionGuard() {
    const { setUser } = useSession();
    const router = useRouter();

    useEffect(() => {
        const syncSession = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user) {
                const { id, email, user_metadata, app_metadata } = user;
                setUser({
                    id,
                    email: email || "",
                    full_name: user_metadata?.full_name || user_metadata?.name || "",
                    avatar_url: user_metadata.avatar_url,
                    provider: app_metadata.provider
                });

                await supabase.from("users").upsert({
                    id,
                    email,
                    full_name: user_metadata?.full_name || user_metadata?.name || null,
                    avatar_url: user_metadata.avatar_url,
                    provider: app_metadata.provider,
                    role_id: 2,
                });

                router.push("/");
            }
        };

        syncSession();
    }, [setUser, router]);

    return null;
}
