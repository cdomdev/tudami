import Image from "next/image";
import { parseDay } from "@/utils/formatDate";
import { UserCircle2 } from "lucide-react";
import { StarRating } from "./StartRating";

export interface User {
  full_name: string;
  avatar_url: string;
}

export interface Opinios {
  id: number;
  full_name: string;
  opinion: string;
  rating: number;
  created_at: string;
  user: User;
}

export function CardOpinions({ created_at, opinion, rating, user }: Opinios) {
  return (
    <article className="rounded-xl border border-accent bg-accent dark:bg-custom-card p-5 h-full shadow-md transition hover:shadow-lg ">
      <div className="flex items-center gap-3 mb-2">
        {user ? (
          <Image
            src={user?.avatar_url}
            alt="profile-image"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="bg-primary/10 p-2 rounded-full">
            <UserCircle2 className="w-6 h-6 text-primary" />
          </div>
        )}
        <div className="leading-tight">
          <p className="text-sm font-semibold">{user?.full_name}</p>
          <p className="text-xs ">{parseDay(created_at)}</p>
        </div>
      </div>
      <div className="w-full h-px bg-accent-foreground mb-4" />
      <p className="text-sm  italic mb-2">{opinion}</p>
      <StarRating value={rating} readOnly={true} />
    </article>
  );
}
