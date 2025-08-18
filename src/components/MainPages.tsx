import { Count } from "@/components/CountMainPages";
import { Pagination } from "@/components/pagination";
import { ReadonlyURLSearchParams } from "next/navigation";

interface MainPageProp {
  children: React.ReactNode;
  count: number;
  page: number;
  total: number;
  pageSize: number;
  searchParams: ReadonlyURLSearchParams;
  basePath: string;
  counttext?: string
}
export function Main({
  children,
  count,
  page,
  total,
  pageSize,
  searchParams,
  basePath,
  counttext
}: MainPageProp) {
  return (
    <>
      <Count count={count} counttext={counttext} />
      <section className="py-2 mb-8 space-y-6">{children}</section>
      <Pagination
        currentPage={page}
        totalItems={total}
        pageSize={pageSize}
        basePath={basePath}
        searchParams={searchParams}
      />
    </>
  );
}
