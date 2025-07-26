import { useEffect, useState } from "react";
import { getQuestionUserBy } from "../../lib/profile";
import { useSearchParams } from "next/navigation";
export default function HomeQuestionsPage() {
  const [resParams, setParams] = useState([]);
  const searchParams = useSearchParams();
  const userId = searchParams.get("u_view_profile_p") || undefined;
  const query = searchParams.get("q") || undefined;

  useEffect(() => {
    async function getDataUserByParamas() {
      if (!userId) {
        return;
      }
      let data = [];
      switch (query) {
        case "questions":
          data = await getQuestionUserBy(userId);
          break;
        default:
          data = [];
          break;
      }
      setParams(data);
    }
    getDataUserByParamas();
  }, [userId, query]);

  console.log("resParams", resParams);
  console.log("userId", userId);
  console.log("query", query);

  return <div>Preguntas</div>;
}
