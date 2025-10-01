// import { PasswordUpdated } from "@/emails/PasswordUpdated";
// import { Resend } from "resend";

// const resend = new Resend(process.env.NEXT_PUBLIC_API_KEY_RESEND);

// export async function POST() {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "Equipo tudami <team@info.tudami.com>",
//       to: ["cdomreyes@gmail.com"],
//       subject: "Hello world",
//       react: PasswordUpdated({ userName: "carlos" }),
//     });

//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }

//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }
