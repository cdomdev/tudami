import { Count } from "@/components/CounterMain";
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
  type?: string;
}
export function Main({
  children,
  count,
  page,
  total,
  pageSize,
  searchParams,
  basePath,
  type = "questions",
}: MainPageProp) {
  return (
    <>
      <Count count={count} type={type} />
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
