"use client";
import { useEffect } from "react";
import { useSession } from "@/context/context.sesion";
import { UserSchema } from "@/schemas"

type Props = {
  user: UserSchema | null;
}

export function SessionHydrator({ user }: Props) {
  const { setUser, setLoading, clearUser, isLoggedIn } = useSession();

  useEffect(() => {
    // Si el servidor no encuentra un usuario, pero el estado del cliente ya tiene una sesión,
    // no borres el estado. Esto evita la condición de carrera durante la redirección de autenticación.
    if (!user && isLoggedIn) {
      setLoading(false);
      return;
    }

    if (user) {
      setUser(user);
    } else {
      clearUser();
    }

    setLoading(false);
  }, [user, setUser, setLoading, clearUser, isLoggedIn]);

  return null;
}
