import { Profile } from "@/components/Profile";
import Link from "next/link";
import { Bell, User } from "lucide-react";
import { useSession } from "@/context/context.sesion";
import { Button } from "@/components/ui/button";

export function ViewOptionAuth() {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return (
      <div className="flex items-center gap-3.5">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 p-0 border-none cursor-pointer hover:bg-transparent dark:hover:bg-transparent"
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">handle notification</span>
          <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500" />
        </Button>
        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
      </div>
    );
  }

  if (user) {
    return <Profile />;
  }

  return (
    <Link href="/auth/login" className="flex items-center">
      <Button
        variant="ghost"
        className="bg-transparent hover:dark:bg-gray-50/5 px-3 py-6 text-sm md:text-base rounded-base cursor-pointer"
      >
        <span className="bg-blue-500 text-white rounded-full p-1.5">
          <User className="size-5" />
          <span className="sr-only">Iniciar sesión</span>
        </span>
        <span className="hidden md:flex font-semibold">Iniciar sesión</span>
      </Button>
    </Link>
  );
}
