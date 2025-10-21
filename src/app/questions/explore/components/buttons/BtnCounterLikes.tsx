import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { useLikesChannelHybrid } from "@/hooks/use-likes-channel-hybrid";

export function BtnCounterLikes({
  question_id,
}: {
  question_id: number;
}) {
  const count = useLikesChannelHybrid(question_id);

  return (
    <Button
      variant="ghost"
      className="hover:bg-none hover:bg-transparent dark:hover:bg-transparent text-slate-700 dark:text-slate-300 "
    >
      <ThumbsUp /> {count}
    </Button>
  );
}
