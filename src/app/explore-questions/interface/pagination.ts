import {ReadonlyURLSearchParams} from "next/navigation";

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  basePath: string;
  searchParams: ReadonlyURLSearchParams;
}
