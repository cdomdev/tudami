"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getMyOffersApi,
  getOffersById,
  getUnansweredOffers,
  getPopularOffers,
} from "../lib/offers";
import { SchemaOffers } from "@/schemas";
import { CardPostOffers } from "../components/CardOffers";
import { Main, NoContent, SkeletonCard } from "@/components";

export default function OffersPage() {
  const [offers, setOffers] = useState<SchemaOffers[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || undefined;
  const search = searchParams.get("search") || undefined;
  const id = searchParams.get("redirect_id_offer") || undefined;
  const pageSize = 10;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const dataCount = offers.length;

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);

      let data = [];

      switch (query) {
        case "popular":
          data = await getPopularOffers(page, pageSize);
          break;
        case "unanswered":
          data = await getUnansweredOffers(page, pageSize);
          break;
        case "redirect":
          data = await getOffersById(page, pageSize, id);
          break;
        case "my":
          data = await getMyOffersApi(page, pageSize);
          break;
        default:
          data = [];
      }

      setOffers(data);
      setTotal(data.length);
      setLoading(false);
    };

    fetchOffers().finally(() => setLoading(false));
  }, [page, search, query, id]);

  return (
    <Main
      basePath="/offers/explore"
      count={dataCount}
      page={page}
      total={total}
      pageSize={pageSize}
      searchParams={searchParams}
      type="offers"
    >
      {loading ? (
        <SkeletonCard mockNumber={5} />
      ) : offers.length === 0 ? (
        <NoContent
          url="/offers/create"
          url_redirect="/offers/explore"
          text="No se encontraron ofertas relacionadas al tema seleccionado."
          text_btn="Crear nueva oferta"
        />
      ) : (
        offers.map((post, i) => <CardPostOffers key={post.id || i} {...post}  />)
      )}
    </Main>
  );
}
