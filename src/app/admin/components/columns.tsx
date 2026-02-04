"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { SchemaResoucesResponse } from "@/schemas";
import { Button } from "@/components/ui/button";
import { BtnDeleteResource } from "./DeleteResource";
import { DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { selectColumn, imageColumn, actionsColumn } from "./columns/helpers";

export const columns: ColumnDef<SchemaResoucesResponse>[] = [
  selectColumn<SchemaResoucesResponse>(),
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const isPublic = row.getValue("status") as string;
      return (
        <div className="flex items-center justify-center">
          {isPublic === "approved" ? (
            <Button variant={"default"} className="bg-green-500 text-gray-50">
              {isPublic}
            </Button>
          ) : isPublic === "rejected" ? (
            <Button variant={"destructive"} className="bg-red-500 text-gray-50">
              {isPublic}
            </Button>
          ) : (
            <Button variant={"default"} className="bg-yellow-500 text-gray-50">
              {isPublic}
            </Button>
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
  imageColumn<SchemaResoucesResponse>("url_image", "/resources/default-courses.webp", "Imagen recurso"),
  actionsColumn<SchemaResoucesResponse>((row, table) => {
    const resource = row.original;
    const { id, slug } = resource;
    const onDelete = (table.options.meta as { onDelete?: (id: number) => void })?.onDelete;

    return (
      <>
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>

        <DropdownMenuItem asChild className="cursor-pointer">
          <BtnDeleteResource resource_id={id} onDelete={onDelete} />
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/admin/resources/edit?slug=${slug}`}>
            Editar recurso
          </Link>
        </DropdownMenuItem>
      </>
    );
  }),
];
