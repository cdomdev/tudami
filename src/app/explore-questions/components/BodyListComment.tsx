import { useEffect, useState } from "react";
import { getCommentBy } from "../lib/listComment";
import Image from "next/image";
import { formatTimestamp } from "@/utils/formatDate";
import { SchemaComment } from "../schema/schemaComments";
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"

export function BodyListComment({ question_id }: { question_id: number }) {
  const [comments, setComments] = useState<SchemaComment[]>([]);
  const [loading, setLoading] = useState(true);
  // const [open, setOpen] = useState(false);
  // const [content, setContent] = useState("");

  useEffect(() => {
    async function fechDataComment() {
      await getCommentBy(question_id)
        .then((data) => setComments(data.comments))
        .finally(() => setLoading(false));
    }
    fechDataComment();
  }, [question_id]);

  // function handleSubmit() {
  //     console.log(content)
  // }

  return (
    <div className="flex flex-col space-y-3 ">
      {loading ? (
        <p className="text-center text-black dark:text-background">
          Cargando respuesta
        </p>
      ) : comments.length === 0 ? (
        <p>Algo salio mal al intentar cargar las respuetas</p>
      ) : (
        comments.map((com, i) => (
          <div
            key={com.id || i}
            className="border-b p-2 mb-3 overflow-x-hidden"
          >
            <div className="flex mb-2 ">
              <div className="flex-shrink-0">
                <Image
                  src={com.users.avatar_url || ""}
                  alt={com.users.full_name}
                  width={40}
                  height={40}
                  className="rounded-full aspect-square object-cover"
                />
              </div>
              <div className="flex ml-3 flex-col items-start">
                <span className=" font-semibold text-base">
                  {com.users.full_name}
                </span>
                <p className="text-sm md:text-base ">{com.text}</p>
              </div>
            </div>
            <div className="translate-x-16 flex gap-2 items-center">
              <span className="text-xs text-accent-foreground">
                {formatTimestamp(com.created_at.toString())}
              </span>
              {/* <div className=" ">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setOpen(!open)}
                                        size={"sm"}
                                        className="text-sm text-primary hover:bg-transparent flex items-center gap-1 cursor-pointer "
                                    >
                                        Responder
                                    </Button>

                                    {open && (
                                        <div className="-translate-x-22 w-xs md:min-w-3xl  mt-5 ">
                                            <Textarea
                                                placeholder="Escribe tu comentario..."
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                rows={3}
                                                className="w-full resize-none focus:outline-none ring-0 focus:ring-0 dark:focus:ring-0 dark:focus:underline-none "
                                            />
                                            <div className="flex gap-2 justify-end mt-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setContent("");
                                                        setOpen(false);
                                                    }}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    className="cursor-pointer"
                                                    size="sm"
                                                    onClick={handleSubmit}
                                                    disabled={loading || !content.trim()}
                                                >
                                                    {loading ? "Enviando..." : "Enviar"}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div> */}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
