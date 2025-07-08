// "use client";

// import { useSearchParams } from "next/navigation";
// import { getSavedQuestions } from "../lib/profile";
// import { useEffect, useState } from "react";
// import { Post } from "@/interface/post";

// export default function SavePage() {
//   const searchParams = useSearchParams();
//   const userId = searchParams.get("user_id");
//   const [savedQuestions, setSavedQuestions] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!userId) {
//         console.error("No user ID provided");
//         setLoading(false);
//         return;
//       }

//       try {
//         const { data } = await getSavedQuestions(userId);
//         // setSavedQuestions(data);
//       } catch (error) {
//         console.error("Error fetching saved questions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   console.log("Estan son la pregnuta guardadas", savedQuestions);

//   return (
//     <section className="p-6 dark:bg-slate-800 bg-accent shadow-md">
//       {loading && (
//         <p className="text-foreground">Cargando preguntas guardadas...</p>
//       )}
//       {!loading && savedQuestions.length === 0 && (
//         <p>No hay preguntas guardadas.</p>
//       )}
//       {!loading && savedQuestions.length > 0 && (
//         <ul>
//           {savedQuestions.map((question) => (
//             <li key={question.id}>{question.title}</li>
//           ))}
//         </ul>
//       )}
//     </section>
//   );
// }
