"use client";

import { columns } from "./columns";
import { GenericTable } from "@/components/ui/GenericTable";
import { SchemaResoucesResponse } from "@/schemas";

export function TableReseources({
  data,
  onDelete,
}: {
  data: SchemaResoucesResponse[];
  onDelete?: (id: number) => void;
}) {
  return <GenericTable data={data} columns={columns} onDelete={onDelete} />;
}
