import { ButtonLike } from "../buttons/ButtonLike";
import { BtnCounterLikes } from "../buttons/BtnCounterLikes";
import { BtnCounterComment } from "../buttons/BtnCounterComment";
import { ButtonComment } from "../buttons/ButtonComment";

export function FooterCardPost({
  question_id,
}: {
  question_id: number;
}) {

  return (
    <>
      <BtnCounterLikes question_id={question_id} />
      <BtnCounterComment question_id={question_id} />

      <div className="flex  justify-between items-center pt-3 border-t border-border">
        <div className="flex gap-2 w-full">
          <ButtonLike question_id={question_id} />
          <ButtonComment question_id={question_id} />
        </div>
      </div>
    </>
  );
}
