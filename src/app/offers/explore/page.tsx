"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { CardPostOffers } from "./components/CardOffers";
import { SchemaOffers } from "@/schemas";
import { Main, SkeletonCard, NoContent } from "@/components";
import { getAllOffers } from "./lib/offers";

export default function PageOferts() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState<SchemaOffers[]>([]);
  const [total, setTotal] = useState(0);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    async function fetchOffers() {
      await getAllOffers(page, pageSize)
        .then((res) => {
          console.log("Offers fetched:", res);
          setOffers(res);
          setTotal(res.length);
        })
        .finally(() => setLoading(false));
    }
    fetchOffers();
  }, [page]);

  console.log(offers)

  return (
    <Main
      basePath="/offers/explore"
      count={offers.length}
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
          text="No hay ofertas disponibles"
          url="/offers/create"
          url_redirect="/"
          text_btn="Crear oferta"
        />
      ) : (
        offers.map((post) => <CardPostOffers key={post.id} {...post} />)
      )}
    </Main>
  );
}
