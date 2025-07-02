import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { toggleLike } from "../lib/likeQuestions";
import { useSession } from "@/context/context.sesion";

export function ToggleLike({ question_id }: { question_id: number }) {
  const { user } = useSession();
  const handleLike = async () => {
    if (!user) {
      console.error("No user session found");
      return;
    }

  const res =  await toggleLike(question_id, user.id);

  console.log("Like toggled --->", res);
  };
  return (
    <Button
      onClick={handleLike}
      variant={"ghost"}
      size="sm"
      className="flex items-center gap-1 cursor-pointer"
    >
      <ThumbsUp /> Me gusta
    </Button>
  );
}
