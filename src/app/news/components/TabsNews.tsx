"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, useRouter } from "next/navigation";

export function TabsNews() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryValue = searchParams.get("sort") || "alls";

  const getActiveTab = () => {
    return queryValue === "news" || !queryValue ? "alls" : queryValue;
  };

  const handleTabChange = (value: string) => {
    if (value === "alls") {
      router.push("/news");
    } else {
      navigateWithParam("sort", value);
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

    router.push(`/news?sort=${value}`, {
      scroll: false,
    });
  };

  return (
    <>
      <nav className="max-w-40 mb-5">
        <Tabs
          value={getActiveTab()}
          onValueChange={handleTabChange}
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full sm:w-auto dark:bg-custom-card">
            <TabsTrigger
              value="alls"
              className="cursor-pointer hover:bg-gray-50 duration-300 text-xs"
            >
              Lo ultimo
            </TabsTrigger>
            <TabsTrigger
              value="populars"
              className="cursor-pointer hover:bg-gray-50 duration-300 text-xs"
            >
              Populares
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </nav>
    </>
  );
}
