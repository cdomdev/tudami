import { useState } from "react";
import { ButtonLike } from "../buttons/ButtonLike";
import { BtnCounterLikes } from "../buttons/BtnCounterLikes";
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
  const [countLikes, setCountLikes] = useState(likes);
  const [countComment, setCountComments] = useState(comments || 0);

  return (
    <>
      <BtnCounterLikes
        question_id={question_id}
        count={countLikes}
        setCount={setCountLikes}
      />
      <BtnCounterComment
        question_id={question_id}
        count={countComment}
        setCount={setCountComments}
      />

      <div className="flex  justify-between items-center pt-3 border-t border-border">
        <div className="flex gap-2 w-full">
          <ButtonLike question_id={question_id} onLikeChange={setCountLikes} />
          <ButtonComment
            question_id={question_id}
            onCommentChange={setCountComments}
          />
        </div>
      </div>
    </>
  );
}
