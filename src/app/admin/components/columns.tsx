"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Delete, MoreHorizontal } from "lucide-react";
import { SchemaResoucesResponse } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { BtnDeleteResource } from "./DeleteResource";
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
  {
    accessorKey: "url_image",
    header: "Imagen",
    cell: ({ row }) => {
      const url = row.getValue("url_image") as string | null;
      const fallback = "/resources/default-courses.webp";
      return (
        <div className="flex items-center justify-center">
          <Image
            src={url || fallback}
            alt="Imagen recurso"
            width={40}
            height={40}
            className="rounded-full object-cover w-10 h-10"
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

            <DropdownMenuItem asChild className="cursor-pointer">
              <BtnDeleteResource resource_id={id} />
            </DropdownMenuItem>

            {/* Acción editar */}
            <DropdownMenuItem asChild className="cursor-pointer">
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
