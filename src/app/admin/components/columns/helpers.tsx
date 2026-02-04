"use client";

import * as React from "react";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

export function selectColumn<T>(): ColumnDef<T> {
  return {
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
  };
}

export function imageColumn<T>(accessorKey: string, fallback = "", alt = "image") {
  return {
    accessorKey,
    header: "Avatar",
    cell: ({ row }: { row: Row<T> }) => {
      const url = row.getValue(accessorKey) as string | null;
      return (
        <div className="flex items-center justify-center">
          <Image
            src={url || fallback}
            alt={alt}
            width={40}
            height={40}
            className="rounded-full object-cover w-10 h-10"
          />
        </div>
      );
    },
  } as ColumnDef<T>;
}

export function actionsColumn<T>(renderContent: (row: Row<T>, table: Table<T>) => React.ReactNode): ColumnDef<T> {
  return {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {renderContent(row, table)}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  } as ColumnDef<T>;
}