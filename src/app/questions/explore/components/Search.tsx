"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (trimmed) {
      params.set("search", trimmed);
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="relative flex flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        aria-label="Buscar preguntas"
        placeholder="Buscar preguntas..."
        className="pl-10 bg-white dark:bg-slate-700 dark:text-slate-100 focus:ring-0 focus:border-blue-300 pr-0"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <Button
        variant="ghost"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-20 md:w-24 cursor-pointer hover:bg-transparent dark:hover:bg-transparent"
        onClick={handleSearch}
      >
        Buscar
      </Button>
    </div>
  );
}
