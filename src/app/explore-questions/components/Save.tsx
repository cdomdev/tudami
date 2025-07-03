import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

export function SaveButton({
  onSave,
  isSaved,
}: {
  onSave: () => void;
  isSaved: boolean;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onSave}
      className={`cursor-pointer ${
        isSaved
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-gray-200 text-gray-800"
      } px-4 py-2 rounded-md transition-colors duration-200`}
    >
      <Bookmark
        className={`h-5 w-5 ${isSaved ? "text-white" : "text-gray-800"}`}
      />
    </Button>
  );
}
