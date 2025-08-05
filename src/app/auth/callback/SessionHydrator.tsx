"use client";
import { useEffect } from "react";
import { useSession } from "@/context/context.sesion";
import { UserSchema } from "@/schemas"

type Props = {
  user: UserSchema | null;
}

export function SessionHydrator({ user }: Props) {
  const { setUser, setLoading, clearUser } = useSession();

  useEffect(() => {
    if (user) {
      setUser(user);
    } else {
      clearUser();
    }

    setLoading(false);
  }, [user, setUser, setLoading, clearUser]);

  return null;
}
