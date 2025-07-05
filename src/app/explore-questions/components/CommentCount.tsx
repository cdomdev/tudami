import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CommentCount() {
  return (
    <Button variant={"ghost"} className="hover:bg-none hover:bg-transparent cursor-pointer">
      <MessageCircle className="h-8 w-8 text-gray-500 dark:text-white" />
    </Button>
  );
}
