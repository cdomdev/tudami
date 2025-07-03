import { useState } from "react";
import { ToggleLike } from "./ToggleLike";
import { LikeCount } from "./LikeCount";
import { ShareButton } from "./Share";
import { CommentCount } from "./CommentCount";

export function LikeSection({
  question_id,
  likes,
}: {
  question_id: number;
  likes: number;
}) {
  const [count, setCount] = useState(likes);

  return (
    <>
      <LikeCount question_id={question_id} count={count} setCount={setCount} />
      <CommentCount />

      <div className="flex justify-between items-center pt-3 border-t border-border">
        <div className="flex gap-4">
          <ToggleLike question_id={question_id} onLikeChange={setCount} />
        </div>
        <ShareButton title="Comparte esta pregunta" />
      </div>
    </>
  );
}
