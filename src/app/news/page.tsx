"use client";

import { TabsNews } from "./components/TabsNews";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TargetUser } from "./components/TargetUser";
import { CardNews } from "./components/CardsNews";
import { SkeletonCardNews } from "./components/SkeletonCard";
import { useState, useEffect } from "react";
import { getNews, getPopularsNews } from "./lib/new";
import { SchemaNews } from "@/schemas";
import { useSearchParams } from "next/navigation";
import { EmptyNews } from "./components/EmptyNews";

export default function PageNews() {
  const searchParams = useSearchParams();
  const [news, setNews] = useState<SchemaNews[]>([]);
  const [loading, setLoading] = useState(false);
  const param = searchParams.get("sort") || undefined;

  useEffect(() => {
    setLoading(true);
    async function fetchNews() {
      let response = [] as SchemaNews[];
      switch (param) {
        case "alls":
          response = await getNews();
          break;
        case "populars":
          response = await getPopularsNews();
          break;
        default:
          response = await getNews();
          break;
      }

      if (response.length > 0) {
        setNews(response);
        setLoading(false);
      }else{
        setNews([]);
        setLoading(false);
      }
    }
    fetchNews();
  }, [param]);

  return (
    <>
      <section
        className="relative w-full max-w-7xl mx-auto h-64 md:h-[28rem] rounded-2xl overflow-hidden mt-10"
        id="news"
      >
        <Image
          src="/panel_news.webp"
          alt="Panel de noticias de desarrollo"
          fill
          priority
          className="object-cover dark:mask-b-to-80%"
        />

        <div className="absolute p-4 md:p-6 rounded-2xl  bg-gradient-to-t from-white via-white to-white/80 dark:from-black/50 dark:via-black/30 dark:to-black/50 bottom-5 md:bottom-10 left-2 md:left-16 dark:text-white max-w-xs md:max-w-lg">
          <h1 className="text-lg md:text-4xl font-extrabold leading-tight dark:drop-shadow-lg text-balance">
            Entérate de las últimas noticias en programación
          </h1>
          <p className="mt-3 text-sm md:text-base dark:drop-shadow text-balance">
            Mantente al día con tendencias, frameworks y novedades del mundo del
            desarrollo.
          </p>
          <Link
            href="/news?sort=populars"
            className="mt-5 flex text-xs w-fit md:text-sm px-5 py-2 gap-3 font-normal  
               transition uppercase  hover:bg-none dark:hover:bg-none items-center"
          >
            <ArrowRight className="w-7 h-7 shadow-md  bg-accent rounded-full p-1" />
            Lo mas popular
          </Link>
        </div>
      </section>

      <section className="max-w-6xl grid mx-auto pb-10 grid-cols-1 md:grid-cols-6 mt-10">
        <section className="mt-2 col-span-4 order-2 md:order-1 px-5">
          <TabsNews />
          <section>
            {loading ? (
              <SkeletonCardNews />
            ) : news.length === 0 ? (
              <EmptyNews/>
            ) : (
              news.map((item) => <CardNews key={item.id} {...item} />)
            )}
          </section>
        </section>
        <section className="col-span-2 order-1  px-5 mb-5">
          <TargetUser />
        </section>
      </section>
    </>
  );
}
