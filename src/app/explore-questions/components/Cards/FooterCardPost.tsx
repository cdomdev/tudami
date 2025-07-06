import { useState } from "react";
import { ButtonLike } from "../buttons/ButtonLike";
import { BtnCounterLikes } from "../buttons/BtnCounterLikes";
import { ButtonShare } from "../buttons/ButtonShare";
import { BtnCounterComment } from "../buttons/BtnCounterComment";
import { ButtonComment } from "../buttons/ButtonComment";

export function FooterCardPost({
  question_id,
  likes,
  comments,
}: {
  question_id: number;
  likes: number;
  comments: number;
}) {
  const [count, setCount] = useState(likes);
  const [countComment, setCountComments] = useState(comments || 0)

  return (
    <>
      <BtnCounterLikes question_id={question_id} count={count} setCount={setCount} />
      <BtnCounterComment question_id={question_id} count={countComment} setCount={setCountComments} />

      <div className="flex  justify-between items-center pt-3 border-t border-border">
        <div className="flex gap-2">
          <ButtonLike question_id={question_id} onLikeChange={setCount} />
          <ButtonComment question_id={question_id} />
        </div>
      </div>
    </>
  );
}
