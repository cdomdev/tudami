"use client";
import { useEffect } from "react";
import { Session, useSession } from "@/context/context.sesion";


type Props = {
  user: Session | null;
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
