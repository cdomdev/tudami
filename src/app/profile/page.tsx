import HomePageProfile from "./pageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Perfil de usuario", template: "%s | Tudami" },
  description:
    "Accede a tu perfil en Tudami para gestionar tu información personal, ajustar configuraciones y personalizar tu experiencia en la comunidad.",
};

export default function UserProfile() {
  return <HomePageProfile />;
}
