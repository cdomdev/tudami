"use client";

import { columnsNews } from "./columnsNews";
import { GenericTable } from "@/components/ui/GenericTable";
import { SchemaNews } from "@/schemas";

export function TableNews({
  data,
  onDelete,
}: {
  data: SchemaNews[];
  onDelete?: (id: number) => void;
}) {
  return (
    <GenericTable
      data={data}
      columns={columnsNews}
      onDelete={onDelete}
      showPagination={true}
      showFooter={true}
    />
  );
}
