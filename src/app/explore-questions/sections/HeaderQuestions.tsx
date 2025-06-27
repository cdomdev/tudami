"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header className="sticky top-16 z-10 py-4 px-2 sm:px-2 ">
      <div className="max-w-6xl bg-accent p-4 rounded-md mx-auto px-4 shadow-sm mb-4">
        {/* Encabezado y descripción */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Explorar Preguntas</h1>
          <p className="text-muted-foreground">
            Encuentra preguntas, comparte conocimientos y conecta con otros
            estudiantes
          </p>
        </div>

        {/* Filtros y búsqueda */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar preguntas..."
              className="pl-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <Select>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Filtrar por tema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sena">SENA</SelectItem>
                <SelectItem value="programming">Programación</SelectItem>
                <SelectItem value="design">Diseño</SelectItem>
                <SelectItem value="other">Otros</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Más recientes</SelectItem>
                <SelectItem value="popular">Más populares</SelectItem>
                <SelectItem value="commented">Más comentadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 max-w-6xl mx-auto ">
        <nav className="w-full sm:w-auto bg-accent p-2 rounded-md shadow-sm">
          <ul className="flex sm:flex-row gap-2">
            <li className="md:mr-4 hover:underline">
              <Link href="/explore-questions/new">Todas</Link>
            </li>
            <li className="md:mr-4 hover:underline">
              <Link href="/explore-questions/popular">Populares</Link>
            </li>
            <li className="md:mr-4 hover:underline">
              <Link href="/explore-questions/unanswered">Sin responder</Link>
            </li>
            <li className="md:mr-4 hover:underline">
              <Link href="/explore-questions/my">Mis preguntas</Link>
            </li>
          </ul>
        </nav>

        <Button asChild className="group sm:ml-auto w-64">
          <Link href="/create-questions">
            <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
            Nueva pregunta
          </Link>
        </Button>
      </div>
    </header>
  );
}
