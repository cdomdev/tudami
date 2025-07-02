"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Plus } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  // Diccionarios de nombres legibles para selects
  const topicMap: Record<string, string> = {
    sena: "SENA",
    programming: "Programación",
    design: "Diseño",
    other: "Otros",
  };

  const queryValue = searchParams.get("query") || "new";

  const getActiveTab = () => {
    return queryValue === "new" || !queryValue ? "all" : queryValue;
  };

  const navigateWithParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key === "page") {
      params.set("page", "1");
    }
    router.push(`/explore-questions/questions?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleTabChange = (value: string) => {
    if (value === "all") {
      router.push("/explore-questions");
    } else {
      navigateWithParam("query", value);
    }
  };

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    navigateWithParam("search", trimmed);
  };

  return (
    <>
      <div className="z-10 pt-8  mt-5">
        <div className="max-w-6xl  bg-card p-4 rounded-md mx-auto shadow-sm mb-4">
          {/* Encabezado y descripción */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-3">Explorar Preguntas</h1>
            <p className="md:text-base">
              Encuentra preguntas, comparte conocimientos y conecta con otros
              estudiantes
            </p>
          </div>

          {/* Filtros y búsqueda */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                aria-label="Buscar preguntas"
                placeholder="Buscar preguntas..."
                className="pl-10 bg-white dark:bg-slate-300 dark:text-slate-900 hover:bg-slate-200 focus:ring-0 dark:focus:border-blue-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto ">
              <Select
                onValueChange={(value) => navigateWithParam("topic", value)}
              >
                <SelectTrigger className="min-w-44 dark:bg-slate-300   cursor-pointer ring-0 ring-slate-300 hover:ring-slate-400 focus:ring-0 dark:text-black hover:bg-slate-200 dark:hover:bg-slate-200">
                  <SelectValue
                    placeholder={
                      topicMap[searchParams.get("topic") || ""] ||
                      "Filtrar por tema"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sena">SENA</SelectItem>
                  <SelectItem value="programming">Programación</SelectItem>
                  <SelectItem value="design">Diseño</SelectItem>
                  <SelectItem value="other">Otros</SelectItem>
                </SelectContent>
              </Select>

              <Button asChild className="group sm:ml-auto">
                <Link href="/create-questions">
                  <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                  Nueva pregunta
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
      </div>
      <div className="flex flex-col w-full sm:flex-row justify-between items-start sm:items-center gap-4  max-w-6xl mx-auto sm:px-4 md:px-0 sticky top-20  self-start max-h-[calc(100vh-2rem)] ">
        <Tabs
          value={getActiveTab()}
          onValueChange={handleTabChange}
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full sm:w-auto dark:bg-card">
            <TabsTrigger
              value="all"
              className="cursor-pointer hover:bg-gray-50 duration-300"
            >
              Inicio
            </TabsTrigger>
            <TabsTrigger
              value="popular"
              className="cursor-pointer hover:bg-gray-50 duration-300"
            >
              Populares
            </TabsTrigger>
            <TabsTrigger
              value="unanswered"
              className="cursor-pointer hover:bg-gray-50 duration-300"
            >
              Sin responder
            </TabsTrigger>
            <TabsTrigger
              value="my"
              className="cursor-pointer hover:bg-gray-50 duration-300"
            >
              Mis preguntas
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </>
  );
}
