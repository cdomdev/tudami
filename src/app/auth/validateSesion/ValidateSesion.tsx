// app/validate-session.tsx
import { cookies } from "next/headers";
import { ClientSessionRenderer } from "./ClientSessionRenderer";

export default async function ValidateSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sb-access-token")?.value;

  const isAuthenticated = !!sessionToken;

  return <ClientSessionRenderer isAuthenticated={isAuthenticated} />;
}
