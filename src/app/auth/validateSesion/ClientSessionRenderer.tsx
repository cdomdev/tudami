import { Profile } from "@/components/Profile";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function ClientSessionRenderer({
  isAuthenticated,
}: {
  isAuthenticated?: boolean;
}) {
  return isAuthenticated ? (
    <Profile />
  ) : (
    <Link href="/auth/login" className="flex items-center">
      <Button
        variant="ghost"
        className="bg-transparent hover:dark:bg-gray-50/5 px-3 py-6 text-sm md:text-base rounded-base cursor-pointer "
      >
        <span className="bg-blue-500 text-white rounded-full p-1.5">
          <User className="size-5" />
          <span className="sr-only">Iniciar sesion</span>
        </span>
        <span className="hidden md:flex font-semibold">Iniciar sesion</span>
      </Button>
    </Link>
  );
}
