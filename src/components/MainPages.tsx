import { Count } from "@/app/explore-questions/components/CountQuestions"
import { Pagination } from "@/components/pagination"
import { ReadonlyURLSearchParams } from "next/navigation";

interface MainPageProp {
    children: React.ReactNode;
    count: number;
    page: number;
    total: number;
    pageSize: number;
    searchParams: ReadonlyURLSearchParams;
    basePath: string;
}
export function Main({ children, count, page, total, pageSize, searchParams, basePath }: MainPageProp) {
    return (
        <>
            <Count count={count} />
            <section className="py-2 mb-8 space-y-6">
                {children}
            </section>
            <Pagination
                currentPage={page}
                totalItems={total}
                pageSize={pageSize}
                basePath={basePath}
                searchParams={searchParams}
            />
        </>
    )
}