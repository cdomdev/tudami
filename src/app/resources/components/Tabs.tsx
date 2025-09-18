import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, useRouter } from "next/navigation";

export function TabsNav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || undefined;

  const getActiveTab = () => {
    return !type ? "all" : type;
  };

  const handleTabChange = (value: string) => {
    if (value === "all") {
      router.push("/resources");
    } else {
      navigateWithParam("type", value);
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
    router.push(`/resources?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <nav className="max-w-xs">
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
            Todos
          </TabsTrigger>
          <TabsTrigger
            value="free"
            className="cursor-pointer hover:bg-gray-50 duration-300 text-xs"
          >
            Gratis
          </TabsTrigger>
          <TabsTrigger
            value="paid"
            className="cursor-pointer hover:bg-gray-50 duration-300 text-xs"
          >
            De pago
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </nav>
  );
}
