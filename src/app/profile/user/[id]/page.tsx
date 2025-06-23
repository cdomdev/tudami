"use client";

import { SectionContainer } from "@/components/SectionContainer";
import { useSession } from "@/context/context.sesion";
import Image from "next/image";

export default function Home() {
  const { user } = useSession();
  return (
    <SectionContainer>
      <Image
        src={user?.avatar_url || "/default-avatar.png"}
        alt={`Avatar de ${user?.full_name}`}
        width={100}
        height={100}
      />
      <h1>Perfil de {user?.full_name}</h1>
    </SectionContainer>
  );
}
