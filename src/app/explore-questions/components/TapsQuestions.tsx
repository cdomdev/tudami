"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, useRouter } from "next/navigation";
import { MapsTags } from "./MapsTags";

export function ExploresQuestionsByTagsLayout() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryValue = searchParams.get("query") || "new";

  const getActiveTab = () => {
    return queryValue === "new" || !queryValue ? "all" : queryValue;
  };
  const handleTabChange = (value: string) => {
    if (value === "all") {
      router.push("/explore-questions");
    } else {
      navigateWithParam("query", value);
    }
  };

  const navigateWithParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key === "page") {
      params.set("page", "1");
    }
    router.push(`/explore-questions/questions?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <>
      <nav>
        <Tabs
          value={getActiveTab()}
          onValueChange={handleTabChange}
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full sm:w-auto dark:bg-custom-card">
            <TabsTrigger
              value="all"
              className="cursor-pointer hover:bg-gray-50 duration-300 text-xs"
            >
              Todas
            </TabsTrigger>
            <TabsTrigger
              value="popular"
              className="cursor-pointer hover:bg-gray-50 duration-300 text-xs"
            >
              Populares
            </TabsTrigger>
            <TabsTrigger
              value="unanswered"
              className="cursor-pointer hover:bg-gray-50 duration-300 text-xs"
            >
              Sin responder
            </TabsTrigger>
            <TabsTrigger
              value="my"
              className="cursor-pointer hover:bg-gray-50 duration-300 text-xs "
            >
              Mis preguntas
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </nav>
      <h3 className="hidden lg:block pt-5 mb-1 text-base lg:text-lg font-normal text-slate-700 dark:text-slate-200 ">
        Temas que te pueden interesar
      </h3>
      <div className="hidden lg:block border-t border-dashed  dark:bg-gray-400 mb-4 dark:border-dashed " />
      <MapsTags />
    </>
  );
}
