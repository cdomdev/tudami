import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { UserCircle2 } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { NoOpinios } from "./NoOpinios";
import { supabase } from "@/utils/supabase/supabaseClient";
import Image from "next/image";
import { StarRating } from "./StartRating";
import { parseDay } from "@/utils/formatDate";
import { DialogOpinions } from "./DialogOpinions";
import { getOpinios } from "@/lib/opinion";
import { SkeletonOpinios } from "./SkeletonOpinios";

interface User {
  full_name: string;
  avatar_url: string;
}
interface Historie {
  id: number;
  nombre: string;
  opinion: string;
  rating: number;
  created_at: string;
  user: User;
}

export function CarouselHistories() {
  const [data, setData] = useState<Historie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOpinions = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getOpinios();
      setData(data || []);
    } catch (error) {
      console.error("ERROR: No se pudieron cargar las opiniones", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOpinions();
    const channel = supabase
      .channel("opinions_realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "opinions",
        },
        async () => {
          await fetchOpinions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchOpinions]);

  if (loading) {
    return <SkeletonOpinios />;
  }

  if (data.length === 0) {
    return <NoOpinios />;
  }

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent className="gap-4 px-4 py-6">
          {data.map((h, index) => (
            <CarouselItem
              key={index}
              className="basis-11/12 sm:basis-1/2 lg:basis-1/3"
            >
              <div className="rounded-xl border border-accent bg-accent dark:bg-custom-card p-5 h-full shadow-md transition hover:shadow-lg cursor-grab">
                <div className="flex items-center gap-3 mb-2">
                  {h.user ? (
                    <Image
                      src={h.user?.avatar_url}
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
                    <p className="text-sm font-semibold">{h.user?.full_name}</p>
                    <p className="text-xs ">{parseDay(h.created_at)}</p>
                  </div>
                </div>
                <div className="w-full h-px bg-accent-foreground mb-4" />
                <p className="text-sm  italic mb-2">{h.opinion}</p>
                <StarRating value={h.rating} readOnly={true} />
              </div>
            </CarouselItem>
          ))}
          <div className="my-auto">
            <DialogOpinions textBtn="Opinar sobre Tudami" variant={"default"} />
          </div>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
