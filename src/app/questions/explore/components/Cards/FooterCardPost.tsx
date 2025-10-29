import { ButtonLike } from "../buttons/ButtonLike";
import { BtnCounterLikes } from "../buttons/BtnCounterLikes";
import { ButtonComment } from "../buttons/ButtonComment";
import { DrawerComments } from "../DrawerComments";

export function FooterCardPost({ question_id }: { question_id: number }) {
  return (
    <>
      <BtnCounterLikes question_id={question_id} />
      <DrawerComments question_id={question_id}/>

      <div className="border-t pt-2">
        <div className="flex items-center gap-2">
          <div className="shrink-0 self-start">
            <ButtonLike question_id={question_id} />
          </div>
          <div className="flex-1">
            <ButtonComment question_id={question_id} />
          </div>
        </div>
      </div>
    </>
  );
}
