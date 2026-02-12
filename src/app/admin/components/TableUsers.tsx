"use client";
import { columnsUsers } from "./columnsUsers";
import { GenericTable } from "@/components/ui/GenericTable";
import { UserSchema } from "@/schemas";

export function TableUsers({
  data,
  onDelete,
}: {
  data: UserSchema[];
  onDelete?: (id: number) => void;
}) {
  return (
    <GenericTable data={data} columns={columnsUsers} onDelete={onDelete} showFooter={true} />
  );
}
