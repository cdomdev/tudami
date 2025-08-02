import HomePageProfile from "./pageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil",
  description: "Perfil de usuario con información personal y configuraciones",
};

export default function UserProfile() {
  return <HomePageProfile />;
}
