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
      className="hover:bg-none hover:bg-transparent dark:hover:bg-transparent text-slate-400 hover:text-slate-400 "
    >
      <ThumbsUp /> {count}
    </Button>
  );
}
