import { useSession } from "@/context/context.sesion";
import FormLogin from "@/components/FormLogin";
import { Profile } from "@/components/Profile";

export default function ValidateSession() {
  const { isLoggedIn, isLoading } = useSession();

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 animate-pulse">
        <div className="relative w-10 h-10 bg-muted rounded-full">
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-bounce" />
        </div>

        <div className="w-10 h-10 bg-muted rounded-full" />
      </div>
    );
  }

  return isLoggedIn ? <Profile /> : <FormLogin />;
}

