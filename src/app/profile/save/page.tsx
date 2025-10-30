"use client";

import { useSearchParams } from "next/navigation";
import {
  getSavedQuestions,
  getSavedOffers,
  getListApplications,
} from "../lib/profile";
import { useEffect, useState } from "react";
import { CardsQuestionSaves } from "../components/cards/CardsQuestionSaves";
import { SchemaOffers, SchemaPost, OfferApplication } from "@/schemas";
import { CardPostOffers } from "@/app/offers/explore/components";
import { CardListApplicants } from "../components/cards/CardListApplicants";
import Link from "next/link";
import { SkeletonCard } from "@/components";

type PageType = "questions" | "offers" | "list_aplications";

export default function SavePage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");
  const offerId = searchParams.get("offer_id");
  const page = (searchParams.get("page") as PageType) || "questions";
  const [data, setData] = useState<
    (SchemaPost | SchemaOffers | OfferApplication)[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setData([]);
      let data = [];
      switch (page) {
        case "questions":
          data = await getSavedQuestions();
          break;
        case "offers":
          data = await getSavedOffers();
          break;
        case "list_aplications":
          data = await getListApplications(offerId || "");
          break;
        default:
          data = [];
      }
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, [userId, page, offerId]);

  const labels = {
    questions: {
      title: "Preguntas guardadas",
      empty: "No hay preguntas guardadas.",
      loading: "Cargando preguntas guardadas...",
    },
    offers: {
      title: "Ofertas guardadas",
      empty: "No hay ofertas guardadas.",
      loading: "Cargando ofertas guardadas...",
    },
    list_aplications: {
      title: "Listado de candidatos que aplicaron a tu oferta",
      empty: "No hay candidatos que aplicaron a esta oferta.",
      loading: "Cargando datos...",
    },
  };

  const itemsNav = [
    {
      title: "Preguntas",
      value: "questions",
      href: `/profile/save?page=questions&user_id=${userId}`,
    },
    {
      title: "Ofertas",
      value: "offers",
      href: `/profile/save?page=offers&user_id=${userId}`,
    },
  ];

  function isActiveTab(value: string) {
    return page === value;
  }

  return (
    <>
      <aside>
        <nav>
          <ul className="flex gap-x-1 border-t border-r border-l border-gray-50 dark:border-none  max-w-fit rounded-t-sm cursor-pointer ">
            {itemsNav.map((item, i) => (
              <li
                key={i}
                className={`px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-500 hover:rounded-t-sm font-medium border-t border-r border-l border-gray-200 dark:border-none rounded-t-sm ${
                  isActiveTab(item.value) ? "bg-gray-200 dark:bg-gray-600" : ""
                }`}
              >
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <section className="p-6 dark:bg-custom-card shadow-sm rounded-b-sm rounded-r-sm">
        {loading && <SkeletonCard mockNumber={2} />}

        {!loading && data.length === 0 && (
          <p className="text-foreground text-center">{labels[page].empty}</p>
        )}

        {!loading && data.length > 0 && (
          <>
            <h2 className="text-lg font-normal mb-7 border-b pb-1">
              {labels[page].title}
            </h2>
            <div className="space-y-4">
              {page === "questions" &&
                (data as SchemaPost[]).map((q, index) => (
                  <CardsQuestionSaves key={q.id || index} {...q} />
                ))}

              {page === "offers" &&
                (data as SchemaOffers[]).map((o, index) => (
                  <CardPostOffers
                    key={`${o.id}-${o.created_at} || ${index}`}
                    {...o}
                    hidden_btn_apply={true}
                    hidden_btn_counter={true}
                  />
                ))}

              {page === "list_aplications" &&
                (data as OfferApplication[]).map((o, index) => (
                  <CardListApplicants key={o.application_id || index} {...o} />
                ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
