"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { UserSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { selectColumn, imageColumn, actionsColumn } from "./columns/helpers";

export const columnsUsers: ColumnDef<UserSchema>[] = [
  selectColumn<UserSchema>(),
  {
    accessorKey: "full_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => (
      <div className="capitalize font-medium max-w-xs truncate">
        {row.getValue("full_name")}
      </div>
    ),
  },
  imageColumn<UserSchema>("avatar_url", "/news/default-news.webp", "Avatar"),
  {
    accessorKey: "email",
    header: "Correo electrónico",
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return <div className="capitalize font-medium">{email}</div>;
    },
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        País
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const role = row.getValue("country") as string;
      return <div className="text-sm">{role}</div>;
    },
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Ciudad
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const role = row.getValue("city") as string;
      return <div className="text-sm">{role}</div>;
    },
  },
  
  actionsColumn<UserSchema>((row) => {
    const user = row.original;
    const { id } = user;

    return (
      <>
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>

        <DropdownMenuItem asChild className="cursor-pointer">
          {/* <BtnDeleteUser user_id={id} onDelete={(table.options.meta as { onDelete?: (id: number) => void })?.onDelete} /> */}
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer" disabled>
          <Link href={`/admin/users/edit?id=${id}`}>Editar usuario</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/admin/users/details/${id}`}>Ver usuario</Link>
        </DropdownMenuItem>
      </>
    );
  }),
];
