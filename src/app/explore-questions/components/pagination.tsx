"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PaginationProps } from "../interface/pagination";

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  basePath,
  searchParams,
}: PaginationProps) {
  console.log("Pagination component rendered with:", {
    currentPage,
    totalItems,
    pageSize,
    basePath,
    searchParams: searchParams.toString(),
  });

  const totalPages = Math.ceil(totalItems / pageSize);

  // if (totalPages <= 1) return null;

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${basePath}?${params.toString()}`;
  };

  // Lógica para mostrar un rango de páginas
  const getPageNumbers = () => {
    const delta = 2; // Páginas a mostrar antes y después de la actual
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Siempre mostrar la primera página
      pages.push(1);
      
      if (currentPage > delta + 2) {
        pages.push("...");
      }
      
      // Páginas alrededor de la actual
      const start = Math.max(2, currentPage - delta);
      const end = Math.min(totalPages - 1, currentPage + delta);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - delta - 1) {
        pages.push("...");
      }
      
      // Siempre mostrar la última página
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <section className="py-8">
      <div className="flex justify-center items-center gap-2 flex-wrap">
        {/* Botón Anterior */}
        {currentPage > 1 && (
          <Button asChild variant="outline" size="sm">
            <Link href={createPageLink(currentPage - 1)}>Anterior</Link>
          </Button>
        )}

        {/* Números de página */}
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                ...
              </span>
            );
          }
          
          const pageNum = page as number;
          return (
            <Button
              key={pageNum}
              asChild
              variant={pageNum === currentPage ? "default" : "outline"}
              size="sm"
            >
              <Link href={createPageLink(pageNum)}>{pageNum}</Link>
            </Button>
          );
        })}

        {/* Botón Siguiente */}
        {currentPage < totalPages && (
          <Button asChild variant="outline" size="sm">
            <Link href={createPageLink(currentPage + 1)}>Siguiente</Link>
          </Button>
        )}
      </div>
      
      {/* Información adicional */}
      <div className="text-center text-sm text-muted-foreground mt-4">
        Página {currentPage} de {totalPages} ({totalItems} elementos en total)
      </div>
    </section>
  );
}
