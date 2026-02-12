"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { listUsers} from "../_lib";
import {  UserSchema } from "@/schemas";
import { TableSkeleton } from "../components/skeletons/TableSkeleton";
import { useRouter } from "next/navigation";
import { TableUsers } from "../components/TableUsers";

export default function PageUsersAmd() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<UserSchema[]>([]);
  const searchParams = useSearchParams();
  const [total, setTotal] = useState(0);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10;
  const router = useRouter();

  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const res = await listUsers(page, pageSize);
      setResponse(res.data || []);
      setTotal(res.length > 0 ? res[0].total : 0);
      setLoading(false);
    }
    fetchData();
  }, [page, pageSize]);
  
  console.log("Total users:", response);
  // const handleDelete = (id: number) => {
  //   setResponse((prev) => prev.filter((user) => user.id !== id));
  //   setTotal((prev) => prev - 1);
  // };

  const goToPage = (newPage: number) => {
    router.push(`/admin/users?page=${newPage}`);
  };

  return (
    <main>
      <section className="flex justify-between px-6 items-center md:px-12  ">
        <header>
          <h1 className="text-lg md:text-2xl mb-3 font-semibold">Usuarios</h1>
        </header>
      </section>
      <section className="mt-10 lg:max-w-7xl mx-auto">
        <h2 className="text-foreground md:text-base mb-4">
          Listado de usuarios 
        </h2>
        {loading ? (
          <TableSkeleton />
        ) : (
          <TableUsers data={response} />
        )}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
          >
            Anterior
          </Button>
          <span className="text-sm">
            Página {page} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(page + 1)}
            disabled={page >= totalPages}
          >
            Siguiente
          </Button>
        </div>
      </section>
    </main>
  );
}
