"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Check, X } from "lucide-react";
import { SchemaResoucesResponse } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<SchemaResoucesResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "public",
    header: "Estado",
    cell: ({ row }) => {
      const isPublic = row.getValue("public") as boolean;
      return (
        <div className="flex items-center justify-center">
          {isPublic ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <X className="w-4 h-4 text-red-500" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Título del recurso
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Categoría",
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      return <div className="capitalize font-medium">{category}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const category = row.getValue("type") as string;
      const isPayment = category === "free" ? "Pago" : "Gratis";
      return <div className="capitalize font-medium">{isPayment}</div>;
    },
  },
  {
    accessorKey: "url_image",
    header: "Imagen",
    cell: ({ row }) => {
      const url = row.getValue("url_image") as string | null;
      const fallback = "";
      return (
        <div className="flex items-center justify-center">
          <Image
            src={url || fallback}
            alt="Imagen recurso"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const resource = row.original;
      const { id, slug } = resource;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => {
                console.log("Eliminar recurso con id:", id);
                navigator.clipboard.writeText(id.toString());
              }}
            >
              Eliminar recurso
            </DropdownMenuItem>

            {/* Acción editar */}
            <DropdownMenuItem asChild>
              <Link href={`/admin/resources/edit?slug=${slug}`}>
                Editar recurso
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
